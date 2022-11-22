import classes from './customButton.module.css';

const CustomButton = ({children, isGoogleSignIn, ...otherProps}) => {
  return ( 
    <button {...otherProps} className={`${classes.CustomButton} ${isGoogleSignIn && classes.googlSignIn}`}>{children}</button>
   );
}
 
export default CustomButton;