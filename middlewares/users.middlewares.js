//models
const { User } = require("../models/user.model");
//utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const userExist = catchAsync(async (req, res, next) => {
    //nos traemos el id de params
    const { id } = req.params;
    //usamos findOne para encontrarlo por id y si esta activo en nuestra app
    const user = await User.findOne({
        where: { id, status: "active" },
        //removemos la contraseña por buenas practicas
        attributes: { exclude: ["password"] },
    });

    //validamos si no encontro el usuario, mandamos un error 404
    if (!user) {
        return next(new AppError("User not found", 404)); //el return detiene el flujo de node (de arriba hacia abajo, si nuestra condicion se cumple)
    }

    //en caso de no error adjuntamos el user a nuestro req
    req.user = user;
    next(); // next lo usamos para dicirle que pase al siguient middleware o que complete la operación.
});

//exportamos la función
module.exports = { userExist };
