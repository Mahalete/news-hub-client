import React, { useEffect } from 'react';
import News from './News';

function App({ firebaseApp }) {
  useEffect(() => {
    if (!firebaseApp) return; // Check if firebaseApp is defined

    // You can perform any initialization logic here
    // For example, check if the user is authenticated
    const auth = firebaseApp.auth();
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log('User is signed in:', user);
      } else {
        console.log('No user is signed in.');
      }
    });

    // Or you can fetch initial data from Firebase
    // For example, fetch some data from Firestore
    const db = firebaseApp.firestore();
    const collectionName = 'yourCollection'; // Replace 'yourCollection' with the actual collection name
    db.collection(collectionName).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.id, ' => ', doc.data());
        });
      })
      .catch(error => {
        console.log('Error getting documents: ', error);
      });
  }, [firebaseApp]);

  return (
    <div className="App">
      <News />
    </div>
  );
}

export default App;