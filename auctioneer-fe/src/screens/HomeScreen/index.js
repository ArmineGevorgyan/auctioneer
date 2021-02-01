import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Button, Item, Icon, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { numberToCashFormatter } from "../../helpers/numberHelper";
import { getCurrentUser } from "../../redux/ducks/user";
import { getProducts, filterProducts } from "../../redux/ducks/product";
import styles from "./styles.css";
import constants from "../../constants";

class HomeScreen extends React.PureComponent {
  componentDidMount() {
    const { current_page, getProducts, getCurrentUser } = this.props;

    getCurrentUser();
    getProducts(current_page);
  }

  handleChange = (event) => {
    const { filterProducts, productList } = this.props;
    const text = event.target.value;

    const list = productList.data.filter(
      (item) => item.name.includes(text) || item.desctiption.includes(text)
    );

    filterProducts(list);
  };

  productList = () => {
    const { t, filteredList } = this.props;
    const list = filteredList;

    return (
      <Item.Group>
        {list.map((item) => (
          <Item key={item.id}>
            <Item.Image
              size="medium"
              src={item.image || constants.placeholderImageUrl}
            />
            <Item.Content>
              <Item.Header>{item.name}</Item.Header>
              <Item.Description>{item.desctiption}</Item.Description>
              <Item.Extra>
                {t("products.startingPrice")}:{" "}
                {numberToCashFormatter(item.starting_price)}
              </Item.Extra>
              <Item.Extra>
                {t("products.currentPrice")}:{" "}
                {numberToCashFormatter(item.current_price)}
              </Item.Extra>
              <Button
                as={Link}
                to={`/products/${item.id}`}
                secondary
                className="button"
              >
                {t("products.bidNow")}
              </Button>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    );
  };

  render() {
    const { t, loading, productList, getProducts, user } = this.props;

    if (loading || !productList || !user) {
      return <Loader loading={loading || !productList || !user} />;
    }

    const isVisitor = !user.is_admin;
    const unreadNotifications = user.notifications.find(
      (element) => !element.is_seen
    );
    const { current_page, col, dir, last_page } = productList;

    return (
      <div id="home_screen">
        <h1 className="container">
          <Button className="notifications" as={Link} to={`/notifications`}>
            <Icon className="icon" name="bell" size="large" />
            {unreadNotifications && (
              <Icon className="notifications_dot" name="circle" size="tiny" />
            )}
          </Button>

          {t("products.products")}
          <Button className="settings" as={Link} to={`/settings`}>
            <Icon className="icon" name="settings" size="large" />
          </Button>
        </h1>

        {!isVisitor && (
          <Button primary as={Link} to={`/products/create`}>
            {t("products.new")}
            <Icon className="icon" name="plus" />
          </Button>
        )}
        <div className="container">
          <Input
            icon
            placeholder="Search..."
            className="floatLeft"
            onChange={(e) => this.handleChange(e)}
          >
            <input />
            <Icon name="search" />
          </Input>
          <Button
            basic
            color="black"
            className="floatRight"
            onClick={() => getProducts(current_page, "current_price", "asc")}
          >
            {t("products.priceAsc")}
          </Button>
          <Button
            basic
            color="black"
            className="floatRight"
            onClick={() => getProducts(current_page, "current_price", "desc")}
          >
            {t("products.priceDesc")}
          </Button>
        </div>
        <div className="list_container">{this.productList()}</div>
        <div className="pagination">
          {current_page > 1 && (
            <Button
              secondary
              className="floatLeft"
              onClick={() => getProducts(current_page - 1, col, dir)}
            >
              {t("products.prev")}
            </Button>
          )}
          {last_page != current_page && (
            <Button
              secondary
              className="floatRight"
              onClick={() => getProducts(current_page + 1, col, dir)}
            >
              {t("products.next")}
            </Button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.product.loading,
  current_page: state.product.current_page,
  col: state.product.col,
  dir: state.product.dir,
  filteredList: state.product.filteredList,
  productList: state.product.productList,
  user: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(getCurrentUser()),
  filterProducts: (list) => dispatch(filterProducts(list)),
  getProducts: (page, dir, col) => dispatch(getProducts(page, dir, col)),
});

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(HomeScreen);
