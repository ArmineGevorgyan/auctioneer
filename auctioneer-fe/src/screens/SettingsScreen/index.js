import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import { withTranslation } from "react-i18next";
import { Input, FormField, Button } from "semantic-ui-react";
import Loader from "../../components/Loader";
import schema from "../../validation/settingsSchema";
import Validation from "../../validation";
import { getCurrentUser, updateCurrentUser } from "../../redux/ducks/user";
import styles from "./styles.css";

class SettingsScreen extends React.PureComponent {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  onSubmit = (data) => {
    this.props.updateCurrentUser(data);
  };

  render() {
    const { t, loading, user } = this.props;

    if (loading || !user) {
      return <Loader loading={loading || !user} />;
    }
    return (
      <div id="settings_screen">
        <h1>{t("settings.welcome")}</h1>
        <Formik
          initialValues={{
            max_bid_amount: user.max_bid_amount,
          }}
          validationSchema={schema}
          onSubmit={this.onSubmit}
          render={(props) => {
            const { values } = props;

            return (
              <Form className="ui form">
                <div className="settings_container">
                  <div>
                    <FormField>
                      <label htmlFor="max_bid_amount" className="label">
                        <span>{t("settings.max_bid_amount")}</span>
                      </label>
                      <Validation name="max_bid_amount" showMessage={true}>
                        <Input
                          autoCapitalize="off"
                          value={values.max_bid_amount}
                          name="max_bid_amount"
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
                    {t("settings.buttonText")}
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
  loading: state.user.loading,
  user: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(getCurrentUser()),
  updateCurrentUser: (data) => dispatch(updateCurrentUser(data)),
});

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(SettingsScreen);
