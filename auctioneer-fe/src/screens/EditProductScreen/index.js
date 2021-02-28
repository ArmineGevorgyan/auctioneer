import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Icon } from "semantic-ui-react";
import { updateProduct, getProductById } from "../../redux/ducks/product";
import ProductForm from "../../components/ProductForm";
import schema from "../../validation/productSchema";
import Loader from "../../components/Loader";

class EditProductScreen extends React.PureComponent {
  componentDidMount() {
    const {
      product,
      getProductById,
      match: {
        params: { id },
      },
    } = this.props;
    if (!product) {
      getProductById(id);
    }
  }

  onSubmit = (values) => {
    values.closing_date = new Date(values.closing_date).toISOString();
    this.props.updateProduct(this.props.product.id, values);
  };

  render() {
    const { t, isAdmin, product, loading, history } = this.props;

    if (isAdmin === "false") {
      this.props.history.goBack();
    }

    if (!product || loading) {
      return <Loader loading={!product || loading} />;
    }

    return (
      <div id="product_update">
        <Icon
          name="arrow left"
          size="large"
          className="floatLeft goBack"
          onClick={() => this.props.history.goBack()}
        />
        <h1 className="clear">{t("productForm.editTitle")} </h1>
        <div className="container">
          <ProductForm
            history={history}
            initialValues={{
              name: product.name,
              description: product.description || "",
              starting_price: product.starting_price,
              current_price: product.current_price,
              closing_date: product.closing_date,
              image: product.image || "",
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
  loading: state.product.loading,
  isAdmin: state.auth.isAdmin,
});

const mapDispatchToProps = (dispatch) => ({
  getProductById: (id) => dispatch(getProductById(id)),
  updateProduct: (id, values) => dispatch(updateProduct(id, values)),
});

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(EditProductScreen);
