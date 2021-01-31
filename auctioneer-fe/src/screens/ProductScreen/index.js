import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Button, Item } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { numberToCashFormatter } from "../../helpers/numberHelper";
import { getProductById } from "../../redux/ducks/product";
import styles from "./styles.css";
import constants from "../../constants";

const ProductScreen = ({ t, loading, product, getProductById }) => {
  const { id } = useParams();
  useEffect(() => {
    getProductById(id);
  }, []);

  if (loading || !product) {
    return <Loader loading={loading} />;
  }

  return (
    <div id="product_screen">
      <div className="list_container">
        <Item>
          <h1>{product.name}</h1>
          <Item.Image
            size="large"
            src={product.image || constants.placeholderImageUrl}
          />
          <Item.Content>
            <Item.Description>{product.desctiption}</Item.Description>
            <Item.Extra>
              {t("products.starting_price")}:{" "}
              {numberToCashFormatter(product.starting_price)}
            </Item.Extra>
            <Item.Extra>
              {t("products.current_price")}:{" "}
              {numberToCashFormatter(product.current_price)}
            </Item.Extra>
          </Item.Content>
          <Button secondary className="button">
            {t("products.bidNow")}
          </Button>
        </Item>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.product.loading,
  product: state.product.product,
});

const mapDispatchToProps = (dispatch) => ({
  getProductById: (id) => dispatch(getProductById(id)),
});

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(ProductScreen);
