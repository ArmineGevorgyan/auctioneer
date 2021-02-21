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
        <h1>{t("profile.welcome")}</h1>
        <div className="container">
          {isVisitor && (
            <div className="ui divided list">
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
                <Button as={Link} to={`/settings`}>
                  <div className="floatRight">
                    <Icon className="icon" name="angle right" size="large" />
                  </div>
                  <div className="floatLeft">{t("profile.won")}</div>
                </Button>
              </div>
            </div>
          )}

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
