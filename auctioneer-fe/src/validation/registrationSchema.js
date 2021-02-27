import * as Yup from "yup";
import i18n from "../i18n";

const registrationSchema = Yup.object().shape({
  password: Yup.string().required(i18n.t("validator.password_required")),
  username: Yup.string().required(i18n.t("validator.username_required")),
  email: Yup.string()
    .email(i18n.t("validator.email_invalid"))
    .required(i18n.t("validator.email_required")),
});

export default registrationSchema;
