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
      <div className={`${classes.links} ${currentUser && classes.add}`}>
        <div className={classes.signout}>
          {currentUser ? (
            <p>hi, {currentUser.displayName}</p>
          ) : (
            <Link to="/signin">sign in</Link>
          )}
          <div
            className={` ${classes.underline} ${
              path.includes("/signin") ? classes.active : ""
            }`}
          />
        </div>
        <div className={classes.signout}>
          {currentUser ? <div onClick={signOutUser}>sign out</div> : null}
        </div>
      </div>
    </div>
  );
}
 
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})
export default connect(mapStateToProps)(NavBar);