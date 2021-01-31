import React from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import "./App.css";
import AuthenticationRoute from "./components/AuthenticationRoute";
import { authenticate } from "./redux/ducks/auth";
import LoginScreen from "./screens/LoginScreen/index.js";
import HomeScreen from "./screens/HomeScreen/index.js";
import ProductScreen from "./screens/ProductScreen";

class App extends React.Component {
  componentDidMount() {
    this.props.authenticate();
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <AuthenticationRoute
            path="/login"
            withAuth={false}
            component={LoginScreen}
            redirectOnFailure="/"
          />
          <AuthenticationRoute
            path="/products/:id"
            withAuth={true}
            component={ProductScreen}
            redirectOnFailure="/login"
          />
          <AuthenticationRoute
            path="/"
            withAuth={true}
            component={HomeScreen}
            redirectOnFailure="/login"
          />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  authenticate: () => {
    dispatch(authenticate());
  },
});

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App);
