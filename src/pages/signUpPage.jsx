import classes from "./signUp.module.css";
import InputForm from "../components/inputForm";
import CustomButton from "../components/customButton";
import { auth, GoogleSignIn, manageUsers } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await manageUsers(user, { displayName });
      setEmail("");
      setDisplayName("");
      setPassword("");
    } catch (error) {
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        setError("Email already exist.");
      }else{
        setError('Unknown error, please try agin.')
      }
      console.log(error.message)
    }
  };
  const handleName = (e) => {
    setDisplayName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>sign up</h1>
      {error ? <p className={classes.error}>{error}</p> : ''}
      <form className={classes.formWrapper} onSubmit={handleSubmit}>
        <InputForm
          placeholder="Full Name"
          value={displayName}
          handleChange={handleName}
          type="text"
          required
        />
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
          <CustomButton>sign up</CustomButton>
          <h3>or</h3>
          <CustomButton onClick={GoogleSignIn} isGoogleSignIn>
            sign up with google
          </CustomButton>
        </div>
      </form>
      <div className={classes.signup}>
        <p>already have and account?</p>
        <Link to="/signin">sign in</Link>
      </div>
    </div>
  );
};

export default SignUpPage;
