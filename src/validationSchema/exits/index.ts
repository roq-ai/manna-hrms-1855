import * as yup from 'yup';

export const exitValidationSchema = yup.object().shape({
  exit_date: yup.date().required(),
  user_id: yup.string().nullable(),
});
