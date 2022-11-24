import classes from './app.module.css';
import NavBar from './components/navbar';
import HomePage from './pages/HomePage';
import SignInPage from './pages/signInPage';
import SignUpPage from './pages/signUpPage';
import Footer from './components/footer';

import { Switch, Route, Redirect } from 'react-router-dom';

import { selectCurrentUser } from './redux/userSelector';
import { connect } from 'react-redux';
import { userAction } from './redux/userAction';
import { createStructuredSelector } from 'reselect';

import { manageUsers,auth, db } from './firebase/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot } from 'firebase/firestore';

import { useEffect } from 'react';

function App({currentUser, setCurrentUser}) {
 useEffect(() => {
   onAuthStateChanged(auth, async (currentUser) => {
     if (currentUser) {
       const userRef = await manageUsers(currentUser);
       onSnapshot(userRef, (getSnapShot) => {
         setCurrentUser({ id: getSnapShot.Id, ...getSnapShot.data() });
         console.log(getSnapShot.data());
       });
     }
   });
 }, []);

  return (
    <div className={classes.app}>
      <NavBar />
      <Switch>
        <Route exact path = '/' component={HomePage} />
        <Route exact path = '/signin' component={SignInPage} />
        <Route exact path = '/signup' component={SignUpPage} />
      </Switch>
      <Footer />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(userAction(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
