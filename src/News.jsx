import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import FilterDropdown from './FilterDropdown'; // Import the FilterDropdown component
import './News.css'; // Import the CSS file
import { FaHeart } from 'react-icons/fa'; // Import the heart icon from react-icons
import SignUpPrompt from './SignUpPrompt'; // Import the SignUpPrompt component

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showSidebar, setShowSidebar] = useState(false); // Add state for sidebar visibility
  const [showSignUpPrompt, setShowSignUpPrompt] = useState(false); // State to control the display of the sign-up prompt

  useEffect(() => {
    fetchNews();
  }, [searchTerm, selectedCategory]);

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
        console.log('API Response:', response.data.results); // Log the API response
        setNewsData(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching news data:', error);
      });
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

  const handleFavoriteClick = (index) => {
    // Implement logic to handle favorite click
    console.log('Favorite clicked for index:', index);
    // Show the sign-up prompt if the user is not logged in
    setShowSignUpPrompt(true);
  };

  const handleSignUpPromptClose = () => {
    // Close the sign-up prompt
    setShowSignUpPrompt(false);
  };

  return (
    <div className={`news-container ${showSidebar ? 'show-sidebar' : ''}`}>
      <Header onSearch={handleSearch} onFilter={handleFilter} />
      {/* Integrate the FilterDropdown component */}
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
                <FaHeart className="favorite-icon" onClick={() => handleFavoriteClick(index)} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No news articles found.</p>
        )}
      </div>
      {/* Render the sign-up prompt if showSignUpPrompt is true */}
      {showSignUpPrompt && <SignUpPrompt onClose={handleSignUpPromptClose} />}
    </div>
  );
};

export default News;
