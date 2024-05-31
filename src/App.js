import React, { useState, useEffect } from 'react';
import News from './News';

function App({ firebaseApp }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!firebaseApp) return; // Check if firebaseApp is defined

    // Listen for authentication state changes
    const unsubscribe = firebaseApp.auth().onAuthStateChanged(currentUser => {
      setUser(currentUser);
    });

    // Unsubscribe from the listener when component unmounts
    return () => unsubscribe();
  }, [firebaseApp]);

  return (
    <div className="App">
      {/* Pass the user prop to the News component */}
      <News user={user} />
    </div>
  );
}

export default App;
