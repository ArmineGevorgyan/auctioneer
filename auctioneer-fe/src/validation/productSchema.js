import * as Yup from "yup";
import constants from "../constants";
import i18n from "../i18n";

const productSchema = Yup.object().shape({
  name: Yup.string().required(i18n.t("validator.name_required")),
  description: Yup.string(),
  starting_price: Yup.number().required(
    i18n.t("validator.starting_price_required")
  ),
  current_price: Yup.number().required(
    i18n.t("validator.current_price_required")
  ),
  closing_date: Yup.date().required(i18n.t("validator.closing_date_required")),
  image: Yup.string().matches(
    constants.validURLRegex,
    i18n.t("validator.image_url_not_valid")
  ),
});

export default productSchema;
