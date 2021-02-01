import React, { useEffect, useRef } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Button, Input, FormField } from "semantic-ui-react";
import { Formik, Form } from "formik";
import { makeBid } from "../../redux/ducks/bid";
import Validation from "../../validation";
import styles from "./styles.css";

const BidForm = ({ t, product, makeBid, history, bid }) => {
  const id = product.id;
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

const mapStateToProps = (state) => ({
  product: state.product.product,
  bid: state.bid.bid,
});

const mapDispatchToProps = (dispatch) => ({
  makeBid: (id, data) => dispatch(makeBid(id, data)),
});

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(BidForm);
