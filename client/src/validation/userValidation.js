import * as yup from 'yup'

export const userSchema = yup.object().shape({
    username:yup.string().required("Username is required"),
    email:yup.string().email("Enter valid email").required("Email is required"),
    password:yup.string().required("Password is required"),
    confirmPassword:yup.string().required("Password confirmation is required")
})

export const loginSchema = yup.object().shape({
    email:yup.string().email("Enter valid email").required("Enter your email"),
    password:yup.string().required("Enter your password")
})