import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Create from "./Pages/Create/Create";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [user, setUser] = useState(false);

  // ======================= STORE USER TO LOCAL STORAGE TO AVIOD LOSING USER DATA ON RELOAD ================

  useEffect(() => {
    const U = localStorage.getItem("user");
    U && JSON.parse(U) ? setUser(true) : setUser(false);
  }, []);
  useEffect(() => {
    localStorage.setItem("user", user);
  }, [user]);

  // =========================================================================================================//
  return (
    <div className="App">
      <Router>
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<Home auth={() => setUser(true)} />} />{" "}
          {/* the auth function is passed as a prob from the the parent component (App) to the child compoonent
          home for logging purpose */}
          {user && <Route path="/create" element={<Create />} />}
          <Route path="*" element={<Navigate to={user ? "/create" : "/"} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
