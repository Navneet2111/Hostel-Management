import * as Yup from "yup";



export const loginSchema = Yup.object({
  email: Yup
  .string()
  .required('Email')
  .email(),

  password: Yup.string().min(6,"password must be 6 digit").required("Password is required"),
});

export const signUpSchema  = Yup.object({
 name:Yup
  .string()
  .required('name is required')
  .min(2)
  .max(25),

  email: Yup
  .string()
  .required('Email / Phone is required')
  .test('email', 'Email / Phone is invalid', (value) => {
     return validateEmail(value) || validatePhone(parseInt(value ?? '0'));
  }),

  password: Yup.string().min(6,"password must be 6 digit").required("Password is required"),

  confirm_password: Yup.string()
  .oneOf([Yup.ref("password"), null], "Passwords must match")
  .required("Confirm Password is required"),
})


const validateEmail = (email) => {
  return Yup.string().email("Invalid Email").isValidSync(email)
};

const validatePhone = (phone) => {
  return Yup.number().integer().positive().test(
     (phone) => {
       return (phone && phone.toString().length >= 9 && phone.toString().length <= 12) ? true : false;
     }
   ).isValidSync(phone);
};



