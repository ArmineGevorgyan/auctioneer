import React from "react";
import { withRouter, Switch } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import "./App.css";
import AuthenticationRoute from "./components/AuthenticationRoute";
import { authenticate } from "./redux/ducks/auth";
import LoginScreen from "./screens/LoginScreen/index.js";

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
            redirectOnFailure="/home"
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

export default compose(withRouter, connect(null, mapDispatchToProps))(App);
