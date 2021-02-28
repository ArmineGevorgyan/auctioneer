import React from "react";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { Button, Input, FormField, TextArea } from "semantic-ui-react";
import CurrencyInput from "react-currency-input";
import { Form, Formik } from "formik";
import Validation from "../validation";

class ProductForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.formik = React.createRef();
  }

  onCancel = () => {
    this.props.history.goBack();
  };

  render() {
    const { t, initialValues, onSubmit, validationSchema } = this.props;

    return (
      <>
        <Formik
          innerRef={(p) => (this.formik = p)}
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
          render={(props) => {
            const values = props.values;

            return (
              <Form className="ui form">
                <div className="container">
                  <div className="bid_container">
                    <FormField>
                      <label htmlFor="name" className="label">
                        <span>{t("productForm.name")}</span>
                      </label>
                      <Validation name="name" showMessage={true}>
                        <Input
                          autoCapitalize="off"
                          value={values.name}
                          name="name"
                        />
                      </Validation>
                    </FormField>
                    <FormField>
                      <label htmlFor="description" className="label">
                        <span>{t("productForm.description")}</span>
                      </label>
                      <Validation name="description" showMessage={true}>
                        <TextArea
                          autoCapitalize="off"
                          value={values.description}
                          name="description"
                        />
                      </Validation>
                    </FormField>
                    <FormField>
                      <label htmlFor="starting_price" className="label">
                        <span>{t("productForm.starting_price")}</span>
                      </label>
                      <Validation name="starting_price" showMessage={true}>
                        <CurrencyInput
                          prefix="$"
                          precision="0"
                          onChangeEvent={(event, maskedvalue, floatvalue) =>
                            this.formik.setValues({
                              ...this.formik.values,
                              starting_price: floatvalue,
                            })
                          }
                          value={values.starting_price}
                          name="starting_price"
                        />
                      </Validation>
                    </FormField>
                    <FormField>
                      <label htmlFor="current_price" className="label">
                        <span>{t("productForm.current_price")}</span>
                      </label>
                      <Validation name="current_price" showMessage={true}>
                        <CurrencyInput
                          prefix="$"
                          precision="0"
                          onChangeEvent={(event, maskedvalue, floatvalue) =>
                            this.formik.setValues({
                              ...this.formik.values,
                              current_price: floatvalue,
                            })
                          }
                          value={values.current_price}
                          name="current_price"
                        />
                      </Validation>
                    </FormField>
                    <FormField>
                      <label htmlFor="image" className="label">
                        <span>{t("productForm.image")}</span>
                      </label>
                      <Validation name="image" showMessage={true}>
                        <Input
                          autoCapitalize="off"
                          value={values.image}
                          name="image"
                        />
                      </Validation>
                    </FormField>
                    <FormField>
                      <label htmlFor="closing_date" className="label">
                        <span>{t("productForm.closing_date")}</span>
                      </label>
                      <Validation name="closing_date" showMessage={true}>
                        <Input
                          autoCapitalize="off"
                          value={values.closing_date}
                          name="closing_date"
                        />
                      </Validation>
                    </FormField>
                    <Button
                      secondary
                      className="button"
                      type="submit"
                      onSubmit={props.onSubmit}
                    >
                      {t("productForm.save")}
                    </Button>
                  </div>
                </div>
              </Form>
            );
          }}
        />
        <Button basic color="black" className="button" onClick={this.onCancel}>
          {t("productForm.cancel")}
        </Button>
      </>
    );
  }
}
export default compose(withTranslation("translations"))(ProductForm);
