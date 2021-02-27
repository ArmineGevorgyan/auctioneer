import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { getCurrentUser } from "../../redux/ducks/user";
import { clearAuthentication } from "../../redux/ducks/auth";

class ProfileScreen extends React.PureComponent {
  componentDidMount() {
    !this.props.user && this.props.getCurrentUser();
  }

  render() {
    const { t, loading, user } = this.props;

    if (loading || !user) {
      return <Loader loading={loading || !user} />;
    }

    const isVisitor = !user.is_admin;

    return (
      <div id="profile_screen">
        <Icon
          name="arrow left"
          size="large"
          className="floatLeft goBack"
          onClick={() => this.props.history.goBack()}
        />
        <h1 className="clear">{t("profile.welcome")}</h1>
        <div className="container">
          <div className="ui divided list">
            {isVisitor && (
              <>
                <div className="item">
                  <Button as={Link} to={`/settings`}>
                    <div className="floatRight">
                      <Icon className="icon" name="angle right" size="large" />
                    </div>
                    <div className="floatLeft">{t("profile.settings")}</div>
                  </Button>
                </div>
                <div className="item">
                  <Button as={Link} to={`/bids`}>
                    <div className="floatRight">
                      <Icon className="icon" name="angle right" size="large" />
                    </div>
                    <div className="floatLeft">{t("profile.bids")}</div>
                  </Button>
                </div>
                <div className="item">
                  <Button as={Link} to={`/won-bids`}>
                    <div className="floatRight">
                      <Icon className="icon" name="angle right" size="large" />
                    </div>
                    <div className="floatLeft">{t("profile.won")}</div>
                  </Button>
                </div>
              </>
            )}
            {!isVisitor && (
              <div className="item">
                <Button as={Link} to={`/register-admin`}>
                  <div className="floatRight">
                    <Icon className="icon" name="angle right" size="large" />
                  </div>
                  <div className="floatLeft">{t("profile.register")}</div>
                </Button>
              </div>
            )}
          </div>

          <Button
            className="logout"
            primary
            onClick={this.props.clearAuthentication}
          >
            {t("settings.logout")}
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  user: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(getCurrentUser()),
  clearAuthentication: () => dispatch(clearAuthentication()),
});

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(ProfileScreen);
