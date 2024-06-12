import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Header from './Header';
import FilterDropdown from './FilterDropdown';
import './News.css';
import { UserContext } from './UserContext';
import { FaHeart } from 'react-icons/fa';
import SignUpPrompt from './SignUpPrompt';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const News = () => {
  const { user } = useContext(UserContext);
  const [newsData, setNewsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSignUpPrompt, setShowSignUpPrompt] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [favorited, setFavorited] = useState([]);

  useEffect(() => {
    fetchNews();
    if (user) {
      console.log("should be user favorite")
      fetchFavorites();
    }
  }, [searchTerm, selectedCategory, user]);

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

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/favorites/${user.uid}`);
      setFavorites(response.data);
      setFavorited(response.data.map(f => f.article_id))

     // setNewsData(newsData.filter(n => !favorited.includes(n.article_id)))
    } catch (error) {
      console.error('Error fetching favorite articles:', error);
    }
  };

  const handleFavoriteClick = (news) => {
    if (!user || !user.uid) {
      toast.error('Please log in first!');
      return;
    }

    const { article_id, title, link, description } = news;
    const article = { article_id, title, link, description };
    const data = { userId: user.uid, favorites: [article] };

    axios.post('http://localhost:5000/api/favorites', data)
      .then(() => {
        toast.success('Article saved to favorites!');
        fetchFavorites();
        setNewsData(newsData.filter(n => article_id !== n.article_id))
      })
      .catch(error => {
        console.error('Error saving article as favorite:', error);
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

  const handleSignUpPromptClose = () => {
    setShowSignUpPrompt(false);
  };
  
  return (
    <div className={`news-container ${showSidebar ? 'show-sidebar' : ''}`}>
      <Header onSearch={handleSearch} onFilter={handleFilter} />
      <FilterDropdown onSelectCategory={handleFilter} />
      {
         user && favorites.length > 0 && (
          <div className="news-content">
            <h3>Favourites</h3>
              <ul className="news-list">
                      {favorites.map((news, index) => (
                        <li className="news-item" key={index}>
                          <a href={news.link} className="news-item-link" target="_blank" rel="noopener noreferrer">
                            <div className="news-item-title">{news.title}</div>
                            <div className="news-item-description">{news.description}</div>
                          </a>
                          <FaHeart
                            className="favorite-icon"
                            color={favorited.includes(news.article_id)? "#f00": "#777"}
                            onClick={() => handleFavoriteClick(news)}
                          />
                        </li>
                      ))}
                    </ul>
              </div>
          )
      }
     
     
      <div className="news-content">
      <h3>All news</h3>
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
                  color={favorited.includes(news.article_id)? "#f00": "#777"}
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
      <ToastContainer />
    </div>
  );
};

export default News;
