const { check } = require('express-validator');


exports.forgetValidation = [
    // The check method is used to validate the 'email' field
    check('email', 'Please enter a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true })
]