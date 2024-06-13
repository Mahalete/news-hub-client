import React, { useState, useEffect } from 'react';
import News from './News';

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
    
    // Assumee there are no favorite news for the user
    const hasFavorites = false;
    setHasFavoriteNews(hasFavorites);
  };

  return (
    <div className="App">
      <UserProvider value={{ user, setUser }}>
        
        <News/>
      </UserProvider>
    </div>
  );
}

export default App;
