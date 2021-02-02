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
import CreateProductScreen from "./screens/CreateProductScreen";
import EditProductScreen from "./screens/EditProductScreen";
import SettingsScreen from "./screens/SettingsScreen";
import NotificationsScreen from "./screens/NotificationsScreen";

class App extends React.Component {
  componentDidMount() {
    this.props.authenticate();
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <AuthenticationRoute
            path="/products/create"
            withAuth={true}
            component={CreateProductScreen}
            redirectOnFailure="/login"
          />
          <AuthenticationRoute
            path="/products/:id/edit"
            withAuth={true}
            component={EditProductScreen}
            redirectOnFailure="/login"
          />
          <AuthenticationRoute
            path="/settings"
            withAuth={true}
            component={SettingsScreen}
            redirectOnFailure="/login"
          />
          <AuthenticationRoute
            path="/notifications"
            withAuth={true}
            component={NotificationsScreen}
            redirectOnFailure="/login"
          />
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
