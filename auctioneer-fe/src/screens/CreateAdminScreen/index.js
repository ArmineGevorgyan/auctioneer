import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";
import { withTranslation } from "react-i18next";
import Loader from "../../components/Loader";
import { registerAdmin } from "../../redux/ducks/auth";
import RegistrationForm from "../../components/RegistrationForm";

class CreateAdminScreen extends React.PureComponent {
  onSubmit = (data) => {
    this.props.register(data, this.props.history);
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
        <h2>{t("authScreen.registerAdmin")}</h2>
        <RegistrationForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch) => ({
  register: (data, history) => dispatch(registerAdmin(data, history)),
});

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(CreateAdminScreen);
