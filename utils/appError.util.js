//declaramos un objeto con programacion orientada a objetos para definir como debe de estar estructurado
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.message = message;
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "error" : "fail"; //aca hacemos ternario para saber si el error es del cliente o de nuestro servidor

        //finalmente capturamos nuestro error
        Error.captureStackTrace(this);
    }
}
//exportamos nuestro objeto error
module.exports = { AppError };
