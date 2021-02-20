import * as Yup from "yup";
import i18n from "../i18n";

const settingsSchema = Yup.object().shape({
  max_bid_amount: Yup.number()
    .required(i18n.t("validator.max_bid_amount_required"))
    .min(0, i18n.t("validator.max_bid_amount_min")),
  autobid_notify_percent: Yup.number()
    .required(i18n.t("validator.autobid_notify_percent_required"))
    .min(0, i18n.t("validator.autobid_notify_percent_min")),
  email: Yup.string()
    .email(i18n.t("validator.email_invalid"))
    .required(i18n.t("validator.email_required")),
});

export default settingsSchema;
