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
import CreateScreen from "./views/CreateScreen";
import Detail from "./views/Detail";

function App({ auth }) {
  console.log(auth);
  const PrivateRoute = ({ children }) => {
    if (auth == undefined) {
      return <Navigate to={"/latinAd-react/login"} />;
    } else {
      if (auth.token != null && auth.token != undefined) {
        return <>{children}</>;
      } else {
        return <Navigate to={"/latinAd-react/login"} />;
      }
    }
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/latinAd-react/" element={<Home />} />
          <Route path="/latinAd-react/login" element={<Login />} />
          <Route
            path="/latinAd-react/screens"
            element={
              <PrivateRoute>
                <ScreensList />
              </PrivateRoute>
            }
          />
          <Route
            path="/latinAd-react/create"
            element={
              <PrivateRoute>
                <CreateScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/latinAd-react/screen/:id"
            element={
              <PrivateRoute>
                <Detail />
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
