import classes from './InputForm.module.css';

const InputForm = ({ handleChange,isTodo, ...otherProps }) => {
  return ( 
    <input className={`${classes.input} ${isTodo ? classes.todo : ''}`} onChange={handleChange} {...otherProps} />
   );
}
 
export default InputForm;