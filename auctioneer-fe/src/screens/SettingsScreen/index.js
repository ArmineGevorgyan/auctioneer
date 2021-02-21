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

    const isVisitor = !user.is_admin;

    return (
      <div id="settings_screen">
        <h1>{t("settings.welcome")}</h1>
        {isVisitor && (
          <Formik
            initialValues={{
              email: user.email,
              max_bid_amount: user.max_bid_amount,
              autobid_notify_percent: user.autobid_notify_percent,
            }}
            validationSchema={schema}
            onSubmit={this.onSubmit}
            render={(props) => {
              const { values } = props;

              return (
                <Form className="ui form">
                  <div className="settings_container">
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
                    <FormField>
                      <label htmlFor="autobid_notify_percent" className="label">
                        <span>{t("settings.autobid_notify_percent")}</span>
                      </label>
                      <Validation
                        name="autobid_notify_percent"
                        showMessage={true}
                      >
                        <Input
                          autoCapitalize="off"
                          value={values.autobid_notify_percent}
                          name="autobid_notify_percent"
                        />
                      </Validation>
                    </FormField>
                    <FormField>
                      <label htmlFor="email" className="label">
                        <span>{t("settings.email")}</span>
                      </label>
                      <Validation name="email" showMessage={true}>
                        <Input
                          autoCapitalize="off"
                          value={values.email}
                          name="email"
                        />
                      </Validation>
                    </FormField>
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
        )}
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
