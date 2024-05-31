import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import FilterDropdown from './FilterDropdown';
import './News.css';
import { FaHeart } from 'react-icons/fa';
import SignUpPrompt from './SignUpPrompt';

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSignUpPrompt, setShowSignUpPrompt] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null); // State to hold user authentication status

  useEffect(() => {
    console.log('Fetching news data...');
    fetchNews();
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    console.log('Fetching favorites and checking user login...');
    fetchFavorites();

    // Check if the user is already logged in
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      // Verify user with backend or Firebase authentication
      verifyUser(parsedUser)
        .then(isValidUser => {
          if (isValidUser) {
            console.log('User already logged in:', parsedUser);
            setUser(parsedUser);
          } else {
            console.log('Invalid user detected, clearing user data...');
            localStorage.removeItem('user');
            setUser(null);
          }
        });
    }
  }, []);

  const verifyUser = async (user) => {
    // Make an API call to verify the user with Firebase authentication
    try {
      const response = await axios.post('/api/verifyUser', { email: user.email });
      return response.status === 200;
    } catch (error) {
      console.error('Error verifying user:', error);
      return false;
    }
  };

  const fetchNews = () => {
    let url = 'https://newsdata.io/api/1/latest?apikey=pub_43336635b2f1ccedd88c458bd9d3939ef3aaf&language=en,fi';

    if (searchTerm) {
      url += `&q=${searchTerm}`;
    }

    if (selectedCategory) {
      url += `&category=${selectedCategory}`;
    }

    axios.get(url)
      .then(response => {
        setNewsData(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching news data:', error);
      });
  };

  const fetchFavorites = () => {
    console.log('User in fetchFavorites:', user);
    if (user) {
      // Fetch user's favorites from the backend API
      axios.get(`/api/favorites/${user.id}`)
        .then(response => {
          setFavorites(response.data);
        })
        .catch(error => {
          console.error('Error fetching favorite articles:', error);
        });
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleFilter = (category) => {
    setSelectedCategory(category);
  };

  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  const handleFavoriteClick = (news) => {
    console.log('handleFavoriteClick called with news:', news);
  
    if (!user) {
      setShowSignUpPrompt(true); // Prompt the user to log in if not logged in
      return;
    }
  
    console.log('User is logged in:', user);
  
    // Send a POST request to save the favorite article
    axios.post('/api/saveFavorite', { userId: user.id, article: news })
      .then(() => {
        console.log('Article saved as favorite:', news.title);
        fetchFavorites(); // Refresh favorites list
      })
      .catch(error => {
        console.error('Error saving article as favorite:', error);
      });
  };
  
  


  const handleSignUpPromptClose = () => {
    setShowSignUpPrompt(false);
  };

  return (
    <div className={`news-container ${showSidebar ? 'show-sidebar' : ''}`}>
      <Header onSearch={handleSearch} onFilter={handleFilter} />
      <FilterDropdown onSelectCategory={handleFilter} />
      <div className="news-content">
        {newsData.length > 0 ? (
          <ul className="news-list">
            {newsData.map((news, index) => (
              <li className="news-item" key={index}>
                <a href={news.link} className="news-item-link" target="_blank" rel="noopener noreferrer">
                  <div className="news-item-title">{news.title}</div>
                  <div className="news-item-description">{news.description}</div>
                </a>
                <FaHeart
                  className="favorite-icon"
                  onClick={() => handleFavoriteClick(news)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No news articles found.</p>
        )}
      </div>
      {showSignUpPrompt && <SignUpPrompt onClose={handleSignUpPromptClose} />}
    </div>
  );
};

export default News;