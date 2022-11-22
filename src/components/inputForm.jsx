import classes from './InputForm.module.css';

const InputForm = ({ handleChange, ...otherProps }) => {
  return ( 
    <input className={classes.input} onChange={handleChange} {...otherProps} />
   );
}
 
export default InputForm;