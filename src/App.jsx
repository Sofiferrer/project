import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import Login from "./views/Login";
import { useSelector } from "react-redux";
import { selectUser } from "./features/auth/authSlice";

function App() {
  const user = useSelector(selectUser);
  console.log(user);

  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
