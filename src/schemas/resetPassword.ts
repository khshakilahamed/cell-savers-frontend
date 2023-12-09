import * as yup from "yup";

export const resetPassSchema = yup.object().shape({
  password: yup.string().min(6).max(30).required(),
});
