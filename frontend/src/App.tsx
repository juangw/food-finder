import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import About from "./components/About";
import UserProfile from "./components/UserProfile";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/userProfile">
            <UserProfile />
          </Route>
          <Route path="/">
            <Search />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
