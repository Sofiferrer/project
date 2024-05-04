import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import Login from "./views/Login";
import ScreensList from "./views/ScreensList";
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
          <Route path="/screens" element={<ScreensList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
