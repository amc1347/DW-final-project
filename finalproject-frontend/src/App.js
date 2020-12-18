import { useEffect, useState } from "react";
import './App.css';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import "firebase/auth";
//Pages
import Home from './containers/Home';
import Login from './containers/Login';
import CreateAccount from './containers/CreateAccount';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userAuthInfo, setUserAuthInfo] = useState({});

  const firebaseConfig ={
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: "dw-final-project-65786.firebaseapp.com",
    projectId: "dw-final-project-65786",
    storageBucket: "dw-final-project-65786.appspot.com",
    messagingSenderId: "728560297146",
    appId: "1:728560297146:web:80083163520b65bbc9ce83"
};

useEffect (() => {
  if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .catch(function (e) {
    console.log("INSTANTIATING AUTH ERROR", e);
  });
}, []);

useEffect(() => {
  firebase.auth().onAuthStateChanged(function(user) {
    console.log({user})
    if(user) {
      // user is logged in
      setLoggedIn(true);
      setUserAuthInfo(user);
    } else {
      setUserAuthInfo({});
      setLoggedIn(false);
    }
    setLoading(false);
  });
}, []);

if(loading) return null;


  return (
    <div className="App">
      <Router>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/create-account">
          <CreateAccount />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>

      </Router>
      <Home />
    </div>
  );
}

export default App;
