import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Button, Item } from "semantic-ui-react";
import { useParams, Link } from "react-router-dom";
import Countdown from "react-countdown";
import Loader from "../../components/Loader";
import { getProductById, deleteProductById } from "../../redux/ducks/product";
import { enableAutobidding, disableAutobidding } from "../../redux/ducks/bid";
import { getCurrentUser } from "../../redux/ducks/user";
import styles from "./styles.css";
import BidForm from "./BidForm";
import BidList from "./BidList";
import constants from "../../constants";
import { cashWithCommas } from "../../helpers/numberHelper";

const ProductScreen = ({
  t,
  loading,
  product,
  getProductById,
  deleteProductById,
  getCurrentUser,
  history,
  isAdmin,
  user,
  bid,
  enableAutobidding,
  disableAutobidding,
}) => {
  const { id } = useParams();

  useEffect(() => {
    getProductById(id);
    getCurrentUser();
  }, [bid]);

  const onDelete = () => {
    deleteProductById(id);
    history.goBack();
  };

  if (loading || !product || !user) {
    return <Loader loading={loading || !product || !user} />;
  }

  const isVisitor = isAdmin == "false";
  const currentBid = user.bids
    .filter((bid) => bid.product_id == id)
    .slice()
    .sort((a, b) => (a.amount > b.amount ? -1 : 1))[0];
  const hasAutobidding = currentBid && currentBid.auto_bidding;

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
            <div className="bidInfo">
              <Item.Extra>
                {t("products.startingPrice")}:
                {cashWithCommas(product.starting_price)}
              </Item.Extra>
              <Item.Extra>
                {t("products.currentPrice")}:{" "}
                {cashWithCommas(product.current_price)}
              </Item.Extra>
              <Item.Extra>
                {t("products.remaintingTime")}:{" "}
                <Countdown date={new Date(product.closing_date)} />
              </Item.Extra>
              <Item.Extra>
                {t("products.minimum")}:{" "}
                {cashWithCommas(product.current_price + 1)}
              </Item.Extra>
              {currentBid && (
                <Item.Extra>
                  {t("products.current")}: {cashWithCommas(currentBid.amount)}
                </Item.Extra>
              )}
            </div>
          </Item.Content>
          {isVisitor && <BidForm history={history} />}
          {isVisitor && !hasAutobidding && (
            <Button basic color="black" onClick={() => enableAutobidding(id)}>
              {t("products.autoBid")}
            </Button>
          )}
          {isVisitor && !!hasAutobidding && (
            <Button basic color="black" onClick={() => disableAutobidding(id)}>
              {t("products.disableAutoBid")}
            </Button>
          )}
          {!isVisitor && <BidList bids={product.bids} />}
        </Item>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.product.loading,
  product: state.product.product,
  user: state.user.currentUser,
  bid: state.bid.bid,
});

const mapDispatchToProps = (dispatch) => ({
  getProductById: (id) => dispatch(getProductById(id)),
  deleteProductById: (id) => dispatch(deleteProductById(id)),
  getCurrentUser: () => dispatch(getCurrentUser()),
  enableAutobidding: (id) => dispatch(enableAutobidding(id)),
  disableAutobidding: (id) => dispatch(disableAutobidding(id)),
});

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(ProductScreen);
