import { useEffect, useState } from "react";
import './App.css';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import "firebase/auth";
//Pages
import Home from './containers/Home';
import Login from './containers/Login';
import CreateAccount from './containers/CreateAccount';
import UserProfile from './containers/UserProfile';
import NewPost from './containers/NewPost';

import Header from "./components/Header";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
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

// from exercise 5


useEffect (() => {
  if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}, [firebaseConfig]);

useEffect(() => {
  firebase.auth().onAuthStateChanged(function(user) {
    console.log({user})
    if(user) {
      // user is logged in
      setUserAuthInfo(user);
      setLoggedIn(true);
    } else {
      // setUserAuthInfo({});
      setLoggedIn(false);
    }
    setLoading(false);
  });
}, []);

function LoginFunction(e) {
  e.preventDefault();
  const email = e.currentTarget.loginEmail.value;
  const password = e.currentTarget.loginPassword.value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function(response) {
      console.log('LOGIN RESPONSE', response);
      setLoggedIn(true);
    })
    .catch(function(error) {
      console.log('LOGIN ERROR', error);
    });
}

function LogoutFunction() {
  firebase
  .auth()
  .signOut()
  .then(function() {
    setLoggedIn(false);
    // setUserAuthInfo({})
  })
  .catch(function (error) {
    console.log("LOGOUT ERROR", error);
  })
}

function CreateAccountFunction(e) {
  e.preventDefault();
  const email = e.currentTarget.createEmail.value;
  const password = e.currentTarget.createPassword.value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function (response) {
      console.log('VALID ACCOUNT CREATED FOR:', email, response);
      setLoggedIn(true);
    })
    .catch(function(error) {
      console.log('ACCOUNT CREATION FAILED', error);
    })
}

function NewPostFunction(e) {
  e.preventDefault();
  const author = e.currentTarget.createAuthor.value;
  const title = e.currentTarget.createTitle.value;
  const text = e.currentTarget.createText.value;

  firebase 
  .auth()
  .createPostWithAuthorTitleText(author, title, text)
  .then(function (response) {
    console.log('Valid Post created by', author, response);
  
  })
  .catch(function(error) {
    console.log('Post failed', error);
  })
}

console.log({userAuthInfo});

if (loading) return null;

// console.log('userAuthInfo');


  return (
    <div className="App">
      <Header loggedIn={loggedIn} LogoutFunction={LogoutFunction}/>

      <Router>
      {/* If someone is logged in, do not take them to login page - take them to user profile */}

      <Route exact path="/login">
        {!loggedIn ? (
            <Login LoginFunction={LoginFunction}/>
        ) : (
            // <Redirect to="/" />
            <UserProfile userAuthInfo={userAuthInfo} /> )} 
      </Route>
      <Route exact path="/create-account">
        {/* if someone is logged in, do not take htem to create account page - take them to user profile */}
        {!loggedIn ? (
            <CreateAccount CreateAccountFunction={CreateAccountFunction}/>
        ) : (
            <Redirect to="/" />
        )}
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/new-post">
        {!loggedIn ? (
            <NewPost NewPostFunction={NewPostFunction} />
        ) : ( 
          <Redirect to="/" /> 
        )}
      </Route>

      </Router>
      {/* <Home /> */}
    </div>
  );
}

export default App;
