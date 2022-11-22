import classes from './navbar.module.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NavBar = () => {
  const [path, setPath] = useState('');
  const { pathname } = useLocation();

  useEffect(() => {
    setPath(pathname);
  }, [pathname])
  return (
    <div className={classes.wrapper}>
      <div className={classes.links}>
        <Link to="/signin">
          sign in
          <div
            className={` ${classes.underline} ${
              path.includes("/signin") ? classes.active : ""
            }`}
          />
        </Link>
        <Link to="/signout">
          sign out
          <div
            className={` ${classes.underline} ${
              path.includes("/signout") ? classes.active : ""
            }`}
          />
        </Link>
      </div>
    </div>
  );
}
 
export default NavBar;