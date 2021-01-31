import React, { useEffect, useRef } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Button, Item, Input, FormField } from "semantic-ui-react";
import { Formik, Form } from "formik";
import { useParams, Link } from "react-router-dom";
import Countdown from "react-countdown";
import Loader from "../../components/Loader";
import { getProductById, deleteProductById } from "../../redux/ducks/product";
import { makeBid } from "../../redux/ducks/bid";
import Validation from "../../validation";
import styles from "./styles.css";
import constants from "../../constants";

const ProductScreen = ({
  t,
  loading,
  product,
  getProductById,
  deleteProductById,
  makeBid,
  history,
  bid,
  isAdmin,
}) => {
  const { id } = useParams();

  useEffect(() => {
    getProductById(id);
  }, []);

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    history.goBack();
  }, [bid]);

  const onSubmit = (values) => {
    makeBid(id, values);
  };

  const onDelete = () => {
    deleteProductById(id);
    history.goBack();
  };

  const getForm = () => {
    return (
      <Formik
        initialValues={{
          amount: "",
        }}
        onSubmit={onSubmit}
        render={(props) => {
          const { values } = props;

          return (
            <Form className="ui form">
              <div className="container">
                <div className="bid_container">
                  <FormField>
                    <label htmlFor="amount" className="label">
                      <span>{t("products.amount")}</span>
                    </label>
                    <Validation name="amount" showMessage={true}>
                      <Input
                        autoCapitalize="off"
                        value={values.amount}
                        name="amount"
                      />
                    </Validation>
                  </FormField>
                  <Button
                    secondary
                    className="button"
                    type="submit"
                    onSubmit={props.onSubmit}
                    disabled={values.amount <= product.current_price}
                  >
                    {t("products.submitBid")}
                  </Button>
                </div>
              </div>
            </Form>
          );
        }}
      />
    );
  };

  if (loading || !product) {
    return <Loader loading={loading} />;
  }

  const isVisitor = !isAdmin || isAdmin == "false";

  return (
    <div id="product_screen">
      <div className="list_container">
        <Item>
          <h1>{product.name}</h1>
          {!isVisitor && (
            <div>
              <Button primary as={Link} to={`/products/${id}/edit`}>
                {t("products.edit")}
              </Button>
              <Button color="red" onClick={() => onDelete()}>
                {t("products.delete")}
              </Button>
            </div>
          )}
          <Item.Image
            size="large"
            src={product.image || constants.placeholderImageUrl}
          />
          <Item.Content>
            <Item.Description>{product.desctiption}</Item.Description>
            <Item.Extra>
              {t("products.startingPrice")}: ${product.starting_price}
            </Item.Extra>
            <Item.Extra>
              {t("products.currentPrice")}: ${product.current_price}
            </Item.Extra>
            <Item.Extra>
              {t("products.remaintingTime")}:{" "}
              <Countdown date={new Date(product.closing_date)} />,
            </Item.Extra>
            <Item.Extra>
              {t("products.minimum")}: ${product.current_price + 1}
            </Item.Extra>
          </Item.Content>
          {getForm()}
        </Item>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.product.loading,
  product: state.product.product,
  bid: state.bid.bid,
  isAdmin: state.auth.isAdmin,
});

const mapDispatchToProps = (dispatch) => ({
  getProductById: (id) => dispatch(getProductById(id)),
  deleteProductById: (id) => dispatch(deleteProductById(id)),
  makeBid: (id, data) => dispatch(makeBid(id, data)),
});

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(ProductScreen);
