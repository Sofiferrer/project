import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import Login from "./views/Login";
import ScreensList from "./views/ScreensList";
import { connect } from "react-redux";

function App({ auth }) {
  console.log(auth);
  const PrivateRoute = ({ children }) => {
    if (auth == undefined) {
      return <Navigate to={"/login"} />;
    } else {
      if (auth.token != null && auth.token != undefined) {
        console.log(auth.token);
        return <>{children}</>;
      } else {
        return <Navigate to={"/login"} />;
      }
    }
  };

  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/screens"
            element={
              <PrivateRoute>
                <ScreensList />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Login />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { auth: state.auth.user };
};

export default connect(mapStateToProps)(App);
