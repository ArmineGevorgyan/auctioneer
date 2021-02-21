import React from "react";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { Grid } from "semantic-ui-react";
import moment from "moment";
import { cashWithCommas } from "../../helpers/numberHelper";
import constants from "../../constants";

class BidList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const { t, bids, isVisitor } = this.props;
    const width = this.state.width;

    if (!bids || bids.length < 1) {
      return <></>;
    }

    const sortedBids = bids
      .slice()
      .sort((a, b) => (a.amount > b.amount ? -1 : 1));

    return (
      <div id="bid_list">
        <h1 className="container">
          {isVisitor ? t("bidList.myBids") : t("bidList.bids")}
        </h1>
        <Grid container columns={width > 700 ? 3 : 1}>
          {sortedBids.map((bid) => (
            <Grid.Column key={bid.id}>
              <div className="bidItem">
                <h2>{bid.user?.username}</h2>
                <p>
                  <strong>
                    {t("bidList.amount")}: {cashWithCommas(bid.amount)}
                  </strong>
                </p>
                <p>
                  {t("bidList.date")}:{" "}
                  {moment(bid.created_at).format("MMMM Do YYYY, h:mm:ss a")}
                </p>
                <p>
                  <strong>
                    {t("bidList.status")}: {constants.bidStatus[bid.status]}
                  </strong>
                </p>
              </div>
            </Grid.Column>
          ))}
        </Grid>
      </div>
    );
  }
}

export default compose(withTranslation("translations"))(BidList);
