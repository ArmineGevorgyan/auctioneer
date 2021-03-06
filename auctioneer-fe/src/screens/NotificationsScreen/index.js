import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import moment from "moment";
import { withTranslation } from "react-i18next";
import { Item, Icon } from "semantic-ui-react";
import Loader from "../../components/Loader";
import { getCurrentUser, markNotificationsSeen } from "../../redux/ducks/user";

class NotificationsScreen extends React.PureComponent {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  componentWillUnmount() {
    this.props.markNotificationsSeen();
  }

  render() {
    const { t, loading, user } = this.props;

    if (loading || !user) {
      return <Loader loading={loading || !user} />;
    }

    const list = user.notifications;

    return (
      <div id="notifiactions_screen">
        <Icon
          name="arrow left"
          size="large"
          className="floatLeft goBack"
          onClick={() => this.props.history.goBack()}
        />
        <h1 className="clear">{t("notifiactions.welcome")}</h1>
        {list.length < 1 ? (
          <h4>{t("notifiactions.empty")}</h4>
        ) : (
          <Item.Group>
            {list.map((item) => (
              <Item key={item.id} className={item.is_seen ? "" : "unseen"}>
                <Item.Content>
                  <Item.Description>{item.content}</Item.Description>
                  <Item.Extra>
                    {moment(item.created_at).format("MMMM Do YYYY, h:mm:ss a")}
                  </Item.Extra>
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
        )}
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
  markNotificationsSeen: () => dispatch(markNotificationsSeen()),
});

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(NotificationsScreen);
