import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Icon } from "semantic-ui-react";
import Loader from "../../components/Loader";
import { register } from "../../redux/ducks/auth";
import RegistrationForm from "../../components/RegistrationForm";

class RegistrationScreen extends React.PureComponent {
  onSubmit = (data) => {
    this.props.register(data);
  };

  render() {
    const { t, loading, history } = this.props;

    return (
      <div id="auth_screen">
        <Icon
          name="arrow left"
          size="large"
          className="floatLeft goBack"
          onClick={() => history.goBack()}
        />
        <Loader loading={loading} />
        <h1>{t("authScreen.welcome")}</h1>
        <h2>{t("authScreen.registrationPrompt")}</h2>
        <RegistrationForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch) => ({
  register: (data) => dispatch(register(data)),
});

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(RegistrationScreen);
