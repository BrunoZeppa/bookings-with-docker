//models
const { Room } = require("../models/room.model");
//utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const roomExist = catchAsync(async (req, res, next) => {
    //nos traemos el id de params
    const { id } = req.params;
    //usamos findOne para encontrarlo por id y si esta activo en nuestra app
    const room = await Room.findOne({ where: { id } });

    //validamos si no encontro el usuario, mandamos un error 404
    if (!room) {
        return next(new AppError("room not found", 404)); //el return detiene el flujo de node (de arriba hacia abajo, si nuestra condicion se cumple)
    }

    //en caso de no error adjuntamos el room a nuestro req
    req.room = room;
    next(); // next lo usamos para dicirle que pase al siguient middleware o que complete la operación.
});

//exportamos la función
module.exports = { roomExist };
