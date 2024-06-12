import React, { useState, useEffect } from 'react';
import News from './News';
import UserDashboard from './UserDashboard';
import { UserProvider } from './UserContext';

function App({ firebaseApp }) {
  const [user, setUser] = useState(null);
  const [hasFavoriteNews, setHasFavoriteNews] = useState(false);

  useEffect(() => {
    if (!firebaseApp) return; // Check if firebaseApp is defined

    // Listen for authentication state changes
    const unsubscribe = firebaseApp.auth().onAuthStateChanged(currentUser => {
      setUser(currentUser);
    });

    // Unsubscribe from the listener when component unmounts
    return () => unsubscribe();
  }, [firebaseApp]);

  useEffect(() => {
    if(!user) {
      const userJSON = localStorage.getItem('user'); // Save user to localStorage
      setUser(JSON.parse(userJSON));
    }
  }, [user]);

  const checkFavoriteNews = async () => {
    // You need to implement logic to check if the user has favorite news
    // This could involve making a request to your backend to fetch the user's favorite news
    // For now, let's assume there are no favorite news for the user
    const hasFavorites = false;
    setHasFavoriteNews(hasFavorites);
  };

  return (
    <div className="App">
      <UserProvider value={{ user, setUser }}>
        {/* Render UserDashboard if user is logged in and has favorite news, otherwise render News */}
        {/*user ? <UserDashboard user={user} /> : <News />*/}
        <News/>
      </UserProvider>
    </div>
  );
}

export default App;
