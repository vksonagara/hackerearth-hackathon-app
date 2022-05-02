import * as Yup from 'yup';

export const emailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

export const otpSchema = Yup.object().shape({
  // otp must be four digit number string
  otp: Yup.string()
    .matches(/^\d{4}$/, 'Invalid OTP')
    .required('Required'),
});
