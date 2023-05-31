
const registerSchema = (data) => {
    const { firstName, email, password, confirmPassword } = data
    const errors = {}

    const passwordValidationRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    const emailValidationRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

    if (!firstName) errors.firstName = "First Name required";
    if (!email) {
        errors.email = "Email Required...!";
    } else if (!emailValidationRegex.test(email)) {
        errors.email = "Enter a valid email"
    }
    if (!password) {
        errors.password = "Password Required"
    } else if (!passwordValidationRegex.test(password)) {
        errors.password = "Password must contain at least one capital letter and one special character"
    }
    if(password !== confirmPassword) errors.confirmPassword = "Password must match"
    return errors;
};


export default registerSchema;