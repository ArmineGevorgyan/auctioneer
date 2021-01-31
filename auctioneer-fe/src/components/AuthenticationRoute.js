import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

class AuthenticationRoute extends Route {
  isValidRouting = () => {
    const { withAuth, isAuthenticated } = this.props;

    if (withAuth === undefined) {
      return true;
    }

    return withAuth ? isAuthenticated : !isAuthenticated;
  };

  componentDidUpdate(prevProps) {
    const { history, isAuthenticated, redirectOnFailure } = this.props;

    if (!prevProps.isAuthenticated && isAuthenticated) {
      history.push(redirectOnFailure);
    }
  }

  render() {
    return this.isValidRouting() ? (
      super.render()
    ) : (
      <Redirect to={this.props.redirectOnFailure} />
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(AuthenticationRoute);
