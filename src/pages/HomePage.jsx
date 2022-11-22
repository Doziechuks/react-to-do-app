import classes from './homePage.module.css';
import Home from '../components/home';
const HomePage = () => {
  return (
    <div className={classes.wrapper}>
      <Home />
    </div>
  );
}
 
export default HomePage;