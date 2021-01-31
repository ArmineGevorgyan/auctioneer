import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Button, Item } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { numberToCashFormatter } from "../../helpers/numberHelper";
import { getProducts, getSortedProducts } from "../../redux/ducks/product";
import styles from "./styles.css";
import constants from "../../constants";

class HomeScreen extends React.PureComponent {
  componentDidMount() {
    const { current_page, getProducts } = this.props;

    getProducts(current_page);
  }

  productList = () => {
    const { t, productList } = this.props;
    const list = productList.data;

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
    const { t, loading, productList, getProducts } = this.props;

    if (loading || !productList) {
      return <Loader loading={loading} />;
    }

    const { current_page, col, dir, last_page } = productList;

    return (
      <div id="home_screen">
        <h1>{t("products.products")}</h1>
        <div className="sorting">
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
  productList: state.product.productList,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: (page, dir, col) => dispatch(getProducts(page, dir, col)),
});

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(HomeScreen);
