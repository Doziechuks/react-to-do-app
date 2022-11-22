import classes from './app.module.css';
import NavBar from './components/navbar';
import HomePage from './pages/HomePage';

import { Switch, Route, Redirect } from 'react-router-dom';


function App() {
  return (
    <div className={classes.app}>
      <NavBar />

      <Switch>
        <Route exact path = '/' component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
