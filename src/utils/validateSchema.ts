import { ObjectSchema } from 'yup';

const validateSchema = (
  schema: ObjectSchema<any>,
  data: any,
): {
  isValid: boolean;
  error: any;
} => {
  try {
    schema.validateSync(data, { abortEarly: false });
    return { isValid: true, error: null };
  } catch (err) {
    return { isValid: false, error: err };
  }
};

export default validateSchema;
