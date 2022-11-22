import classes from './homePage.module.css';
import Home from '../components/home';
import Footer from '../components/footer';
const HomePage = () => {
  return (
    <div className={classes.wrapper}>
      <Home />
      <Footer />
    </div>
  );
}
 
export default HomePage;