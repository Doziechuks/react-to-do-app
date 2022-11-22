import { Link } from "react-router-dom";
import classes from './home.module.css';

const Home = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <h1>we are happy to have you</h1>
        <div className={classes.textAnimation}>
          <div className={classes.linesBox}>
            <p className={classes.lines}>our app</p>
            <p className={classes.lines}>is designed to help you</p>
          </div>
          <div>
            <p className={classes.lines}>get started with</p>
            <p className={classes.lines}>managing your time,</p>
          </div>
          <div>
            <p className={classes.lines}>with amazing features</p>
            <p className={classes.lines}>and perfect functionalities</p>
          </div>
        </div>
        <Link to="signin" className={classes.btn}>
          get started
        </Link>
      </div>
      <img className={classes.clock} src="illustration-1.svg" />
    </div>
  );
}
 
export default Home;