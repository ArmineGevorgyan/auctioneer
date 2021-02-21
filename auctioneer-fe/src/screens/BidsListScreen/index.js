import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import moment from "moment";
import { getCurrentUser } from "../../redux/ducks/user";
import { Link } from "react-router-dom";
import { cashWithCommas } from "../../helpers/numberHelper";
import constants from "../../constants";
import { Button } from "semantic-ui-react";

class BidsListScreen extends React.PureComponent {
  componentDidMount() {
    !this.props.user && this.props.getCurrentUser();
  }

  render() {
    const { t, user } = this.props;
    const bids = user?.bids;

    if (!bids || bids.length < 1) {
      return <></>;
    }

    const sortedBids = bids
      .slice()
      .sort((a, b) => (a.amount > b.amount ? -1 : 1));

    return (
      <div id="bid_screen">
        <h1>{t("bidList.myBids")}</h1>

        <div className="container">
          <div className="ui selection cards">
            {sortedBids.map((bid) => (
              <div className="card" key={bid.id}>
                <img className="image" src={bid.product.image} />
                <div className="content">
                  <div className="header">{bid.product.name}</div>
                  <div className="description">{bid.product.description}</div>
                  <div className="ui divider"></div>
                  <div className="extra content">
                    <p>
                      <strong>{t("bidList.myBid")}</strong>:{" "}
                      {cashWithCommas(bid.amount)}
                    </p>
                    <p>
                      <strong>{t("bidList.date")}</strong>:{" "}
                      {moment(bid.created_at).format("MMMM Do YYYY, h:mm:ss a")}
                    </p>
                    <p>
                      <strong>{t("bidList.closingDate")}</strong>:{" "}
                      {moment(bid.product.closing_date).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </p>
                    <p>
                      <strong>{t("bidList.status")}</strong>:{" "}
                      {constants.bidStatus[bid.status]}
                    </p>
                  </div>
                  <Button as={Link} to={`/products/${bid.product.id}`}>
                    {t("bidList.productButton")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  user: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(getCurrentUser()),
});

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(BidsListScreen);
