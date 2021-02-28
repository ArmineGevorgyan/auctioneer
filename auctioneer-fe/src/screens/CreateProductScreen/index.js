import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Icon } from "semantic-ui-react";
import { createProduct } from "../../redux/ducks/product";
import schema from "../../validation/productSchema";
import ProductForm from "../../components/ProductForm";

class CreateProductScreen extends React.PureComponent {
  onSubmit = (values) => {
    values.closing_date = new Date(values.closing_date).toISOString();
    this.props.createProduct(values);
  };

  componentDidUpdate(prevProps) {
    const { product, history } = this.props;

    if (!prevProps.product && product) {
      history.push(`/products/${product.id}`);
    }
  }

  render() {
    const { t, isAdmin, history } = this.props;

    if (!isAdmin || isAdmin == "false") {
      this.props.history.goBack();
    }

    return (
      <div id="product_create">
        <Icon
          name="arrow left"
          size="large"
          className="floatLeft goBack"
          onClick={() => this.props.history.goBack()}
        />
        <h1 className="clear">{t("productForm.createTitle")} </h1>
        <div className="container">
          <ProductForm
            history={history}
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
          />
        </div>
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
