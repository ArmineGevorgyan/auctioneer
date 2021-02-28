import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Button, Icon, Item } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { getProductById, deleteProductById } from "../../redux/ducks/product";
import { enableAutobidding, disableAutobidding } from "../../redux/ducks/bid";
import { getCurrentUser } from "../../redux/ducks/user";
import BidForm from "./BidForm";
import BidList from "./BidList";
import constants from "../../constants";
import {
  substribeProductCallback,
  unsubstribeProductCallback,
} from "../../helpers/pusherHelper";
import BidInfo from "./BidInfo";

const ProductScreen = ({
  t,
  loading,
  product,
  getProductById,
  deleteProductById,
  getCurrentUser,
  history,
  user,
  bid,
  enableAutobidding,
  disableAutobidding,
}) => {
  const { id } = useParams();

  useEffect(() => {
    substribeProductCallback(id);
    return () => unsubstribeProductCallback(id);
  }, []);

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

  const isVisitor = !user.is_admin;
  const usersBids = user.bids.filter((bid) => bid.product_id == id);
  const currentBid = usersBids
    .slice()
    .sort((a, b) => (a.amount > b.amount ? -1 : 1))[0];
  const hasAutobidding = currentBid && currentBid.auto_bidding;
  const inProgress = product.status == constants.productStatus.IN_PROGRESS;

  return (
    <div id="product_screen">
      <div className="container">
        <Icon
          name="arrow left"
          size="large"
          className="floatLeft goBack"
          onClick={() => history.goBack()}
        />
        <Item>
          <BidInfo product={product} user={user} onDelete={onDelete} />
          {inProgress && isVisitor && <BidForm history={history} />}
          {inProgress && isVisitor && !hasAutobidding && (
            <Button
              basic
              color="black"
              disabled={user.max_bid_left < 1}
              onClick={() => enableAutobidding(id)}
            >
              {t("products.autoBid")}
            </Button>
          )}
          {inProgress && isVisitor && !!hasAutobidding && (
            <Button basic color="black" onClick={() => disableAutobidding(id)}>
              {t("products.disableAutoBid")}
            </Button>
          )}
          {!isVisitor && <BidList bids={product.bids} />}
          {isVisitor && <BidList bids={usersBids} isVisitor={isVisitor} />}
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
