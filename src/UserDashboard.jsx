import React, { useState, useEffect } from 'react';

function UserDashboard({ firebaseApp }) {
  const [favorites, setFavorites] = useState([]);
  const [articles, setArticles] = useState([]);

  // Fetch favorite articles when component mounts
  useEffect(() => {
    if (!firebaseApp) return;

    const fetchFavorites = async () => {
      try {
        const db = firebaseApp.firestore();
        const user = firebaseApp.auth().currentUser;

        if (!user) {
          console.error('No user is signed in.');
          return;
        }

        const favoritesRef = db.collection('favorites').doc(user.uid);
        const favoritesSnapshot = await favoritesRef.get();

        if (favoritesSnapshot.exists) {
          // Get favorite article IDs from Firestore
          const favoriteArticleIds = favoritesSnapshot.data().articles || [];
          const favoriteArticles = [];

          // Fetch details of favorite articles
          await Promise.all(
            favoriteArticleIds.map(async articleId => {
              const articleRef = db.collection('articles').doc(articleId);
              const articleSnapshot = await articleRef.get();

              if (articleSnapshot.exists) {
                favoriteArticles.push({ id: articleSnapshot.id, ...articleSnapshot.data() });
              }
            })
          );

          setFavorites(favoriteArticles);
        } else {
          console.log('No favorites found for the user.');
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [firebaseApp]);

  // Function to add an article to favorites
  const addToFavorites = async (articleId) => {
    try {
      const user = firebaseApp.auth().currentUser;

      if (!user) {
        console.error('No user is signed in.');
        return;
      }

      const db = firebaseApp.firestore();
      const favoritesRef = db.collection('favorites').doc(user.uid);

      // Add article ID to favorites array in Firestore
      await favoritesRef.set({
        articles: [...favorites.map(article => article.id), articleId]
      }, { merge: true });

      // Update local state
      setFavorites([...favorites, articles.find(article => article.id === articleId)]);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  return (
    <div className="user-dashboard">
      <h2>User Dashboard</h2>
      <div className="favorite-articles">
        <h3>Favorite Articles</h3>
        <ul>
          {favorites.map(article => (
            <li key={article.id}>{article.title}</li>
          ))}
        </ul>
      </div>
      <div className="all-articles">
        <h3>All Articles</h3>
        <ul>
          {articles.map(article => (
            <li key={article.id}>
              {article.title}{' '}
              <button onClick={() => addToFavorites(article.id)}>Add to Favorites</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserDashboard;
