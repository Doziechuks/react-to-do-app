import classes from './customButton.module.css';

const CustomButton = ({children, isGoogleSignIn, isTodo, ...otherProps}) => {
  return (
    <button
      {...otherProps}
      className={`${classes.CustomButton} ${
        isGoogleSignIn && classes.googlSignIn
      } ${isTodo ? classes.todo : ""}`}
    >
      {children}
    </button>
  );
}
 
export default CustomButton;