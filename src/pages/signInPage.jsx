import classes from './signIn.module.css';
import InputForm from '../components/inputForm';
import CustomButton from '../components/customButton';
import { GoogleSignIn } from '../firebase/firebase';
import { useState } from 'react';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const handeSubmit = (e) => {
    e.preventDefault();
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>sign in</h1>
      <form className={classes.formWrapper} onSubmit={handeSubmit}>
        <InputForm placeholder="Email" value={email} handleChange={handleEmail} type="email" required />
        <InputForm placeholder="Password" value={password} handleChange={handlePassword} type="password" required />
        <div className={classes.btnWrapper}>
          <CustomButton>sign in</CustomButton>
          <h3>or</h3>
          <CustomButton onClick={GoogleSignIn} isGoogleSignIn>sign in with google</CustomButton>
        </div>
      </form>
    </div>
  );
}
 
export default SignInPage;