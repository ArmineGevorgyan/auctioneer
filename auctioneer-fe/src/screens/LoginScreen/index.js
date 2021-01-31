import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import { withTranslation } from "react-i18next";
import { Input, FormField, Button } from "semantic-ui-react";
import Loader from "../../components/Loader";
import PasswordInput from "./PasswordInput";
import schema from "../../validation/loginSchema";
import Validation from "../../validation";
import { login } from "../../redux/ducks/auth";
import styles from "./styles.css";

class LoginScreen extends React.PureComponent {
  onSubmit = (data) => {
    this.props.login(data);
  };

  render() {
    const { t, loading } = this.props;

    return (
      <div id="login_screen">
        <Loader loading={loading} />
        <h1>{t("loginScreen.welcome")}</h1>
        <h2>{t("loginScreen.loginPrompt")}</h2>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={schema}
          onSubmit={this.onSubmit}
          render={(props) => {
            const { values } = props;

            return (
              <Form className="ui form">
                <div className="login_container">
                  <div>
                    <FormField>
                      <label htmlFor="username" className="label">
                        <span>{t("loginScreen.username")}</span>
                      </label>
                      <Validation name="username" showMessage={true}>
                        <Input
                          autoCapitalize="off"
                          value={values.username}
                          name="username"
                        />
                      </Validation>
                    </FormField>
                    <FormField>
                      <label htmlFor="password" className="label">
                        <span>{t("loginScreen.password")}</span>
                      </label>
                      <Validation name="password" showMessage={true}>
                        <PasswordInput
                          value={values.password}
                          name="password"
                        />
                      </Validation>
                    </FormField>
                  </div>
                  <Button
                    type="submit"
                    secondary
                    onSubmit={props.onSubmit}
                    className="button"
                  >
                    {t("loginScreen.buttonText")}
                  </Button>
                </div>
              </Form>
            );
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(login(username, password)),
});

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(LoginScreen);
