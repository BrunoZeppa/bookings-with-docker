//declaramos nuestro atrapador de errores asincronos, esto nas va aservir para nuestros controladores y nuestro middlewares
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => next(err));
    };
};
//exportamos nuestra funcion
module.exports = { catchAsync };
