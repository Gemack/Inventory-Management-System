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

  useEffect(() => {
    const U = localStorage.getItem("user");
    U && JSON.parse(U) ? setUser(true) : setUser(false);
  }, []);
  useEffect(() => {
    localStorage.setItem("user", user);
  }, [user]);

  // STORE USER TO LOCAL STORAGE TO AVIOD LOSING USER DATA ON RELOAD
  return (
    <div className="App">
      <Router>
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<Home auth={() => setUser(true)} />} />
          {user && <Route path="/create" element={<Create />} />}
          <Route path="*" element={<Navigate to={user ? "/create" : "/"} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

{
  /* <Routes>
<Route path="/" element={<Home />} />
</Routes>
{user ? (
<Routes>
  <Route path="/create" element={<Create />} />
</Routes>
) : (
<Routes>
  <Route path="/create" element={<Home />} />
</Routes>
)} */
}
