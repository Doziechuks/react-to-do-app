import classes from './signIn.module.css';
import InputForm from '../components/inputForm';
import CustomButton from '../components/customButton';
import { GoogleSignIn, auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');

  const handeSubmit = async (e) => {
    e.preventDefault();
     try {
      const { userAuth } = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userAuth);
      setEmail("");
      setPassword("");
    } catch (error) {
         if (error.message === "Firebase: Error (auth/user-not-found).") {
           setError("Email does not exist.");
         } else {
           setError("Unknown error, please try agin.");
         }
      console.log(error.message);
    }
  }

  useEffect(() => {
    let timerId = setInterval(() => {
      setError("");
    }, 3000);

    return () => clearTimeout(timerId);
  }, []);
  
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>sign in</h1>
      {error ? <p className={classes.error}>{error}</p> : ""}
      <form className={classes.formWrapper} onSubmit={handeSubmit}>
        <InputForm
          placeholder="Email"
          value={email}
          handleChange={handleEmail}
          type="email"
          required
        />
        <InputForm
          placeholder="Password"
          value={password}
          handleChange={handlePassword}
          type="password"
          required
        />
        <div className={classes.btnWrapper}>
          <CustomButton>sign in</CustomButton>
          <h3>or</h3>
          <CustomButton onClick={GoogleSignIn} isGoogleSignIn>
            sign in with google
          </CustomButton>
        </div>
      </form>
      <div className={classes.signup}>
        <p>don't have and account?</p>
        <Link to="signUp">sign up</Link>
      </div>
    </div>
  );
}
 
export default SignInPage;