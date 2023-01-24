// import React, { useEffect, useState } from "react";
// import Home from "./pages/home/index";
// import Login from "./pages/login";
// import AuthService from "./services/home/auth";
// import "./App.css";

// function App() {

//   const [user, setUser] = useState<string>("");

//   useEffect(() => {
//     AuthService.checkSession()
//       .then((result) => {
//         setUser(result.data.id);
//       })
//       .catch((err) => {
//         console.log(err);
//         setUser("");
//       });
//   }, []);

//   console.log(user);

//   return (
//     <>
//       {!user && <Login />}
//       {user && <Home />}
//     </>
//   );
// }

// export default App;

export {};
