import * as yup from "yup";

export const forgotPassSchema = yup.object().shape({
  email: yup.string().email().required(),
});
