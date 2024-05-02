import * as yup from 'yup';

const loginValidation = yup
  .object({
    useremail: yup.string().email().required(),
    password: yup.string().min(5).required(),
  })
  .required();


const registerValidation = yup
  .object({
    fullName: yup.string().required(),
    useremail: yup.string().required().email(),
    password: yup.string().min(5).required(),
    cPassword: yup.string().required("Confirm Password is a required field").min(5).oneOf([yup.ref('password')], 'Passwords must match').required(),
  })
  .required();

export {loginValidation, registerValidation};
