import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Button, Icon, Item } from "semantic-ui-react";
import { useParams, Link } from "react-router-dom";
import Countdown from "react-countdown";
import moment from "moment";
import Loader from "../../components/Loader";
import { getProductById, deleteProductById } from "../../redux/ducks/product";
import { enableAutobidding, disableAutobidding } from "../../redux/ducks/bid";
import { getCurrentUser } from "../../redux/ducks/user";
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

  const isVisitor = !user.is_admin;
  const usersBids = user.bids.filter((bid) => bid.product_id == id);
  const currentBid = usersBids
    .slice()
    .sort((a, b) => (a.amount > b.amount ? -1 : 1))[0];
  const hasAutobidding = currentBid && currentBid.auto_bidding;
  const inProgress = product.status == constants.productStatus.IN_PROGRESS;

  const getBiddingInfo = () =>
    inProgress ? (
      <>
        <Item.Extra>
          {t("products.startingPrice")}:{cashWithCommas(product.starting_price)}
        </Item.Extra>
        <Item.Extra>
          {t("products.currentPrice")}: {cashWithCommas(product.current_price)}
        </Item.Extra>
        <Item.Extra>
          {t("products.status")}: {t(`products.${product.status}`)}
        </Item.Extra>
        <Item.Extra>
          {t("products.remaintingTime")}:{" "}
          <Countdown date={new Date(product.closing_date)} />
        </Item.Extra>
        <Item.Extra>
          {t("products.minimum")}: {cashWithCommas(product.current_price + 1)}
        </Item.Extra>
        {currentBid && (
          <Item.Extra>
            {t("products.current")}: {cashWithCommas(currentBid.amount)}
          </Item.Extra>
        )}
      </>
    ) : (
      <>
        <Item.Extra>
          {t("products.status")}: {t(`products.${product.status}`)}
        </Item.Extra>
        {product.sold_price && (
          <Item.Extra>
            {t("products.price")}: {cashWithCommas(product.sold_price)}
          </Item.Extra>
        )}
        {product.winning_user && (
          <Item.Extra>
            {t("products.awardedTo")}: {product.winning_user}
          </Item.Extra>
        )}
        <Item.Extra>
          {t("products.closedDate")}:{" "}
          {moment(product.closing_date).format("MMMM Do YYYY, h:mm:ss a")}
        </Item.Extra>
      </>
    );

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
          <h1 className="clear">{product.name}</h1>
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
            <Item.Description>{product.description}</Item.Description>
            <div className="bidInfo">{getBiddingInfo()}</div>
          </Item.Content>
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
