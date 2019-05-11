import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";
import Container from "react-bootstrap/Container";
import { Provider } from "react-redux";
import withAuth from "./components/ProtectedRoute";
import Logout from "./components/Logout";
import AddExercise from "./components/AddExercise";
import PlannedExercises from "./components/PlannedExercises";

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <Router>
        <Route component={Dashboard} />
        <Container>
          <Route exact path="/" component={withAuth(Home)} />
          <Route exact path="/add-exercise" component={withAuth(AddExercise)} />
          <Route
            exact
            path="/planned-exercises"
            component={withAuth(PlannedExercises)}
          />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
        </Container>
      </Router>
    </Provider>
  );
};

export default Root;
