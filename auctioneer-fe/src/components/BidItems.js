import React from "react";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import moment from "moment";
import { Link } from "react-router-dom";
import { cashWithCommas } from "../helpers/numberHelper";
import constants from "../constants";
import { Button, Icon } from "semantic-ui-react";

const BidItems = ({ t, bids, title, children, history }) => {
  const hasBids = bids && bids.length > 1;

  return (
    <div id="bid_screen">
      <Icon
        name="arrow left"
        size="large"
        className="floatLeft goBack"
        onClick={() => history.goBack()}
      />
      <h1 className="clear">{title || t("bidList.myBids")}</h1>

      {hasBids && (
        <div className="container">
          <div className="ui selection cards">
            {bids.map((bid) => (
              <div className="card" key={bid.id}>
                <img className="image" src={bid.product.image} />
                <div className="content">
                  <div className="header">{bid.product.name}</div>
                  <div className="description">{bid.product.description}</div>
                  <div className="ui divider"></div>
                  <div className="extra content">
                    <p>
                      <strong>{t("bidList.status")}</strong>:{" "}
                      {constants.bidStatus[bid.status]}
                    </p>
                    <p>
                      <strong>
                        {bid.status == constants.bidStatus.WON
                          ? t("bidList.bill")
                          : t("bidList.myBid")}
                      </strong>
                      : {cashWithCommas(bid.amount)}
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
                  </div>
                  {children}
                  <Button as={Link} to={`/products/${bid.product.id}`}>
                    {t("bidList.productButton")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default compose(withTranslation("translations"))(BidItems);
