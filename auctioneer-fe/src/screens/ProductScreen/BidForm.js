import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Button, FormField } from "semantic-ui-react";
import { Formik, Form } from "formik";
import CurrencyInput from "react-currency-input";
import { makeBid } from "../../redux/ducks/bid";
import Validation from "../../validation";

class BidForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.formik = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { history, bid } = this.props;

    if (!prevProps.bid && bid) {
      history.goBack();
    }
  }

  render() {
    const { t, product, makeBid } = this.props;

    const id = product.id;
    const onSubmit = (values) => {
      makeBid(id, values);
    };

    return (
      <Formik
        initialValues={{
          amount: "",
        }}
        innerRef={(p) => (this.formik = p)}
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
                      <CurrencyInput
                        prefix="$"
                        precision="0"
                        value={values.amount}
                        name="amount"
                        onChangeEvent={(event, maskedvalue, floatvalue) =>
                          this.formik.setValues({
                            ...this.formik.values,
                            amount: floatvalue,
                          })
                        }
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
  }
}

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
