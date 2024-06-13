import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const token = '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';  //Ken's token
const options = { headers: { Authorization: `Bearer ${token}` } };

const User = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`https://api.github.com/users/${username}`, options);
        setUserData(userResponse.data);
        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`, options);
        setRepos(reposResponse.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching data');
      }
    };
    fetchUserData();
  }, [username]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div className='result-container' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="user-profile">
        <img src={userData.avatar_url} alt={userData.login} />
        <h2>{userData.name || userData.login}</h2>
        <p>{userData.bio}</p>
        <div className="user-stats">
          <div>
            <strong>{userData.public_repos}</strong>
            <span>Repositories</span>
          </div>
          <div>
            <strong>{userData.followers}</strong>
            <span>Followers</span>
          </div>
          <div>
            <strong>{userData.following}</strong>
            <span>Following</span>
          </div>
        </div>
        <a href={userData.html_url} target="_blank" rel="noopener noreferrer">Go to GitHub</a>
      </div>
      <div className="repositories">
        <h3>My repositories</h3>
        {repos.map((repo) => (
          <div key={repo.id} className="repo">
            <div>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
              <p>{repo.description}</p>
            </div>
            <span>Updated at: {new Date(repo.updated_at).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default User;
