import React, {useEffect, useState} from "react";
import Login from "../pages/login";
import AuthService from "../services/home/auth";

const RequireAuth: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AuthService.checkSession()
      .then((result) => {
        setIsAuthenticated(!!result.data.user);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Login />;
};

export default RequireAuth;
