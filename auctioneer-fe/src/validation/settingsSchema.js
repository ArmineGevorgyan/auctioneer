import * as Yup from "yup";
import i18n from "../i18n";

const settingsSchema = Yup.object().shape({
  max_bid_amount: Yup.number()
    .required(i18n.t("validator.max_bid_amount_required"))
    .min(0, i18n.t("validator.max_bid_amount_min")),
});

export default settingsSchema;
