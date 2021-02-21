import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { getCurrentUser } from "../../redux/ducks/user";
import BidItems from "../../components/BidItems";
import constants from "../../constants";

class WinningBidsScreen extends React.PureComponent {
  componentDidMount() {
    !this.props.user && this.props.getCurrentUser();
  }

  render() {
    const { t, user } = this.props;
    const bids = user?.bids;

    const winningBids =
      bids && bids.filter((bid) => bid.status == constants.bidStatus.WON);

    return (
      <BidItems
        bids={winningBids}
        history={this.props.history}
        title={t("bidList.wonItems")}
      />
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
)(WinningBidsScreen);
