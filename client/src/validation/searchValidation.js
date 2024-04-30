import * as yup from 'yup'

export const searchSchema = yup.object().shape({
    name:yup.string().required("Enter search text").matches(/^\S[^@!#$%^&*()_+={}\[\]:;<>|?"`~]*$/, "Enter valid search item")
})