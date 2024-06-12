import React, { useState, useEffect } from 'react';
import axios from 'axios';
import News from './News';
// TODO: remove the whole component
const UserDashboard = ({ user }) => {
  const [favoriteNews, setFavoriteNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchFavoriteNews();
    } else {
      setLoading(false);
    }
  }, [user]); // Fetch favorite news when user changes

  const fetchFavoriteNews = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/favorites/${user.uid}`);
      setFavoriteNews(response.data);
    } catch (error) {
      console.error('Error fetching favorite news:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-dashboard">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {favoriteNews.length > 0 ? (
            <div>
              <h2>Welcome, {user.email}!</h2>
              <h3>Your Favorite News:</h3>
              <ul>
                {favoriteNews.map((news, index) => (
                  <li key={index}>
                    <a href={news.link} target="_blank" rel="noopener noreferrer">{news.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <News /> // Render default news content
          )}
        </>
      )}
    </div>
  );
};

export default UserDashboard;
