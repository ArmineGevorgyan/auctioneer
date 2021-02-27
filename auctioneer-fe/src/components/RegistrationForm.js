import React from "react";
import { compose } from "redux";
import { Formik, Form } from "formik";
import { withTranslation } from "react-i18next";
import { Input, FormField, Button } from "semantic-ui-react";
import PasswordInput from "./PasswordInput";
import schema from "../validation/registrationSchema";
import Validation from "../validation";

class RegistrationForm extends React.PureComponent {
  render() {
    const { t, onSubmit } = this.props;

    return (
      <div className="container">
        <Formik
          initialValues={{
            username: "",
            password: "",
            email: "",
          }}
          validationSchema={schema}
          onSubmit={onSubmit}
          render={(props) => {
            const { values } = props;

            return (
              <Form className="ui form">
                <div className="auth_container">
                  <div>
                    <FormField>
                      <label htmlFor="username" className="label">
                        <span>{t("authScreen.username")}</span>
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
                        <span>{t("authScreen.password")}</span>
                      </label>
                      <Validation name="password" showMessage={true}>
                        <PasswordInput
                          value={values.password}
                          name="password"
                        />
                      </Validation>
                    </FormField>
                    <FormField>
                      <label htmlFor="email" className="label">
                        <span>{t("authScreen.email")}</span>
                      </label>
                      <Validation name="email" showMessage={true}>
                        <Input
                          autoCapitalize="off"
                          value={values.email}
                          name="email"
                        />
                      </Validation>
                    </FormField>
                  </div>
                  <Button
                    type="submit"
                    secondary
                    onSubmit={props.onSubmit}
                    className="register"
                  >
                    {t("authScreen.register")}
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

export default compose(withTranslation("translations"))(RegistrationForm);
