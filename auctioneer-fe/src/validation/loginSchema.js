import * as Yup from "yup";
import i18n from "../i18n";

const loginSchema = Yup.object().shape({
  password: Yup.string().required(i18n.t("validator.password_required")),
  username: Yup.string().required(i18n.t("validator.username_required")),
});

export default loginSchema;
