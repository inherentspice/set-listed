import React, { useState } from "react";
import AuthService from "../../services/home/auth";
import "./index.css";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<string>("");

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

   // Submit user login info to the database for authentication
   function handleUserLogin(event: React.FormEvent<HTMLFormElement>, email: string, password: string): void {
    event.preventDefault();
    // remove 'user' from userObject
    const userObject = {
      email,
      password,
    };

    AuthService.login(userObject)
      .then(response => {
        setUser(response.data.user);
      })
      .catch(error => {
        setError(error.response.data.error);
      });
  }

  return (
    <div className="login-form-cont">
      <form className="login-form" onSubmit={event => handleUserLogin(event, email, password)}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <input type="submit" value="Login" />
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}