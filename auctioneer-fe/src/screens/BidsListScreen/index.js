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
    return <BidItems bids={bids} />;
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
