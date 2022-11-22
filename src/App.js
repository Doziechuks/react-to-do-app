import classes from './app.module.css';
import NavBar from './components/navbar';
import HomePage from './pages/HomePage';
import SignInPage from './pages/signInPage';
import Footer from './components/footer';

import { Switch, Route, Redirect } from 'react-router-dom';


function App() {
  return (
    <div className={classes.app}>
      <NavBar />
      <Switch>
        <Route exact path = '/' component={HomePage} />
        <Route exact path = '/signin' component={SignInPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
