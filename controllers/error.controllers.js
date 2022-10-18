//traemos a dotenv para nuestras variables de entrono
const dotenv = require("dotenv");

//traemos a appError de utils
const { AppError } = require("../utils/appError.util");

//dirigimos el apuntado de nuesto dotenv
dotenv.config({ path: "./config.env" });

// declaramos una variable para recibir errores de desarrollo
const sendErrorDev = (error, req, res) => {
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        error,
        stack: error.stack,
    });
};
//declaramos una variable para recibir errores de producccion(el cliente)
const sendErrorProd = (error, req, res) => {
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message || "Something went wrong!",
    });
};
//error de sesión expiradad
const tokenExpireError = () => {
    return new AppError("Session expired", 403);
};
//error de sesión inválida
const tokenInvalidSignatureError = () => {
    return new AppError("invalid session", 403);
};
//error de emails repetidos
const dbUniqueConstrainError = () => {
    return new AppError("the email has already taken", 400);
};
//declaramos nuestra funcion de manejador de errores globales
const globalErrorHandler = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    const status = error.status || "fail";

    //llamamos a nuestros errores ya declarado en condicionales

    if (process.env.NODE_ENV === "development") {
        sendErrorDev(error, req, res);
    } else if (process.env.NODE_ENV === "production") {
        let err = { ...error };

        if (error.name === "TokenExpiredError") err = tokenExpireError();
        else if (error.name === "JsonWebTokenError")
            err = tokenInvalidSignatureError();
        else if (error.name === "SequelizeUniqueConstrainError")
            err = dbUniqueConstrainError();

        sendErrorProd(err, req, res);
    }
};

//exportamos nuestra función de de erroresglobales
module.exports = { globalErrorHandler };
