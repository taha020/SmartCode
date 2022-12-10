import "./app.scss";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import { db } from "./FirebaseConnection";
import { useEffect,useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { getAuth,onAuthStateChanged } from "firebase/auth";
import Cookies from 'js-cookie';



function App() {

  let [ LoggedIn, setLoggedIn ]=useState(true)

  useEffect(() => {
    
    console.log("Database Connecetd", db);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(LoggedIn=true)
      } else {
        setLoggedIn(LoggedIn=false)
      }
    });

  }, []);



  return (
    <div>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={ LoggedIn? <Dashboard /> : <Navigate replace to={"/login"} />}
          />
          <Route
            path="/dashboard"
            element={ LoggedIn? <Dashboard /> : <Navigate replace to={"/login"} />}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
