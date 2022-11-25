import classes from './navbar.module.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../redux/userSelector';
import { signOutUser } from '../firebase/firebase';

const NavBar = ({currentUser}) => {
  const [path, setPath] = useState('');
  const { pathname } = useLocation();

  useEffect(() => {
    setPath(pathname);
  }, [pathname])
  return (
    <div className={classes.wrapper}>
      {currentUser ? (
        <div className={classes.usercontainer}>
          <div className={classes.user}>hi, {currentUser.displayName}</div>
          <div className={classes.signout} onClick={signOutUser}>
            sign out
          </div>
        </div>
      ) : (
        <div className={classes.linkbox}>
          <div className={classes.signin}>
            <Link to="/">home</Link>
            <div
              className={` ${classes.underline} ${
                path === '/' ? classes.active : ""
              }`}
            />
          </div>
          <div className={classes.signin}>
            <Link to="/signin">sign in</Link>
            <div
              className={` ${classes.underline} ${
                path.includes("/signin") ? classes.active : ""
              }`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
 
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})
export default connect(mapStateToProps)(NavBar);