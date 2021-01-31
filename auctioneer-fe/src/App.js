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
          <Route path="/products/:id">
            <ProductScreen />
          </Route>
          <Route path="/">
            <HomeScreen />
          </Route>
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

export default compose(withRouter, connect(null, mapDispatchToProps))(App);
