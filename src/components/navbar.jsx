import classes from './navbar.module.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const NavBar = () => {
  return ( 
      <div className={classes.wrapper}>
        <div className={classes.links}>
          <Link to= '/signin'>
            sign in
          </Link>
          <Link to='/signout'>
          sign out
          </Link>
        </div>
      </div>
   );
}
 
export default NavBar;