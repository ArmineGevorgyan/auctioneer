import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Button, Input, FormField, TextArea } from "semantic-ui-react";
import { Formik, Form } from "formik";
import { createProduct } from "../../redux/ducks/product";
import Validation from "../../validation";
import schema from "../../validation/productSchema";
import styles from "./styles.css";

class CreateProductScreen extends React.PureComponent {
  onSubmit = (values) => {
    values.closing_date = new Date(values.closing_date).toISOString();
    this.props.createProduct(values);
  };

  onCancel = () => {
    this.props.history.goBack();
  };

  componentDidUpdate(prevProps) {
    const { product, history } = this.props;

    if (!prevProps.product && product) {
      history.push(`/products/${product.id}`);
    }
  }

  getForm = () => {
    const { t } = this.props;
    return (
      <Formik
        initialValues={{
          name: "",
          description: "",
          starting_price: "",
          current_price: "",
          closing_date: "",
          image: "",
        }}
        onSubmit={this.onSubmit}
        validationSchema={schema}
        render={(props) => {
          const { values } = props;

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
                      <Input
                        autoCapitalize="off"
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
                      <Input
                        autoCapitalize="off"
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
                    {t("productForm.create")}
                  </Button>
                  <Button
                    basic
                    color="black"
                    className="button"
                    onClick={this.onCancel}
                  >
                    {t("productForm.cancel")}
                  </Button>
                </div>
              </div>
            </Form>
          );
        }}
      />
    );
  };

  render() {
    const { t, isAdmin } = this.props;

    if (!isAdmin || isAdmin == "false") {
      this.props.history.goBack();
    }

    return (
      <div id="product_create">
        <h1>{t("productForm.createTitle")} </h1>
        <div className="container">{this.getForm()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.product.product,
  isAdmin: state.auth.isAdmin,
});

const mapDispatchToProps = (dispatch) => ({
  createProduct: (values) => dispatch(createProduct(values)),
});

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(CreateProductScreen);
