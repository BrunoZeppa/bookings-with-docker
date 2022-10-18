const { body, validationResult } = require("express-validator");

const checkValidations = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
        const errorMessages = errors.array().map((err) => err.msg);

        const message = errorMessages.join(". ");

        return res.status(400).json({
            status: "error",
            message,
        });
    }

    next();
};

const createUserValidators = [
    body("username")
        .notEmpty()
        .withMessage("username cannot be empty")
        .isLength({ min: 3 })
        .withMessage("username must be at least 3 characters"),
    body("email").isEmail().withMessage("Must provide a valid email"),
    body("password")
        .isString()
        .withMessage("Password must be a string")
        .notEmpty()
        .withMessage("Password cannot be empty")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
    body("cellPhone")
        .isInt()
        .withMessage("cellPhone must be a number")
        .notEmpty()
        .withMessage("cellPhone cannot be empty"),
    checkValidations,
];

const createRoomsValidators = [
    body("roomType")
        .isString()
        .withMessage("roomType must be a string")
        .isLength({ min: 3 })
        .withMessage("roomType must be at least 3 characters"),
    body("description")
        .isString()
        .withMessage("description must be a string")
        .isLength({ min: 3 })
        .withMessage("description must be at least 3 characters long"),
    body("price").isInt().withMessage("price must be a number"),
    checkValidations,
];

module.exports = { createUserValidators, createRoomsValidators };
