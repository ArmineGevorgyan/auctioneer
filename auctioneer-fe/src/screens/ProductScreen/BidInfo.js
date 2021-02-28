import React from "react";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { Button, Item, Header, Icon, Modal } from "semantic-ui-react";
import Countdown from "react-countdown";
import moment from "moment";
import constants from "../../constants";
import { cashWithCommas } from "../../helpers/numberHelper";

const BidInfo = ({ t, product, user, onDelete }) => {
  const { id } = useParams();
  const [open, setOpen] = React.useState(false);

  const isVisitor = !user.is_admin;
  const usersBids = user.bids.filter((bid) => bid.product_id == id);
  const currentBid = usersBids
    .slice()
    .sort((a, b) => (a.amount > b.amount ? -1 : 1))[0];
  const inProgress = product.status == constants.productStatus.IN_PROGRESS;

  const getModal = () => (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={<Button color="red">{t("products.delete")}</Button>}
    >
      <Header icon>
        <Icon name="trash" />
        {t("products.deleteConfirm")}
      </Header>
      <Modal.Content>
        <p className="deleteText">{t("products.deleteConfirmExtra")}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" inverted onClick={() => setOpen(false)}>
          <Icon name="remove" /> {t("products.no")}
        </Button>
        <Button
          color="green"
          inverted
          onClick={() => {
            onDelete();
            setOpen(false);
          }}
        >
          <Icon name="checkmark" /> {t("products.yes")}
        </Button>
      </Modal.Actions>
    </Modal>
  );

  return (
    <>
      <h1 className="clear">{product.name}</h1>
      {!isVisitor && (
        <div>
          <Button primary as={Link} to={`/products/${id}/edit`}>
            {t("products.edit")}
          </Button>
          {getModal()}
        </div>
      )}
      <Item.Image
        size="large"
        src={product.image || constants.placeholderImageUrl}
      />
      <Item.Content>
        <Item.Description>{product.description}</Item.Description>
        <div className="bidInfo">
          {inProgress ? (
            <>
              <Item.Extra>
                {t("products.startingPrice")}:
                {cashWithCommas(product.starting_price)}
              </Item.Extra>
              <Item.Extra>
                {t("products.currentPrice")}:{" "}
                {cashWithCommas(product.current_price)}
              </Item.Extra>
              <Item.Extra>
                {t("products.status")}: {t(`products.${product.status}`)}
              </Item.Extra>
              <Item.Extra>
                {t("products.remaintingTime")}:{" "}
                <Countdown date={new Date(product.closing_date)} />
              </Item.Extra>
              <Item.Extra>
                {t("products.minimum")}:{" "}
                {cashWithCommas(product.current_price + 1)}
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
          )}
        </div>
      </Item.Content>
    </>
  );
};

export default compose(withTranslation("translations"))(BidInfo);
