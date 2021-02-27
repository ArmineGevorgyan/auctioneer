import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { getCurrentUser } from "../../redux/ducks/user";
import BidItems from "../../components/BidItems";

class BidsListScreen extends React.PureComponent {
  componentDidMount() {
    !this.props.user && this.props.getCurrentUser();
  }

  render() {
    const bids = this.props.user?.bids;
    const uniqueBids = bids && [
      ...new Map(
        bids
          .slice()
          .sort((a, b) => (a.amount < b.amount ? -1 : 1))
          .map((el) => [el["product_id"], el])
      ).values(),
    ];

    return <BidItems bids={uniqueBids} history={this.props.history} />;
  }
}

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  user: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(getCurrentUser()),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  BidsListScreen
);
