import { Dispatch, SetStateAction, useState } from "react";
import AuthService from "../../services/home/auth";

export default function SignUp(props: {logIn: Dispatch<SetStateAction<boolean>>}) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [error, setError] = useState<string>("");

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(event.target.value);
  }

  function handleFirstNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLastName(event.target.value);
  }

   // Submit user login info to the database for authentication
   function handleUserSignUp(
    event: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string,
  ): void {

    event.preventDefault();
    // remove 'user' from userObject
    if (password !== confirmPassword) {
      setError("Passwords must match");
      return;
    }

    const userObject = {
      email,
      password,
      confirmPassword,
      firstName,
      lastName
    };

    AuthService.signup(userObject)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        setError(error.response.data.error);
      });
  }


  return (
    <div className="login-form-cont">
      <form className="login-form" onSubmit={event => handleUserSignUp(event, email, password, confirmPassword, firstName, lastName)}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <label>
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
        </label>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={handleFirstNameChange} />
        </label>
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={handleLastNameChange} />
        </label>
        <br />
        <input type="submit" value="Sign Up!" />
      </form>
      <button className="primary-button login-button" onClick={() => props.logIn(false)}>Login</button>;
      {error && <p>{error}</p>}
    </div>
  );
}
