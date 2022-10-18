//librerias
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

//Models
const { User } = require("../models/user.model");
const { Booking } = require("../models/booking.model");

//utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");
const { getBookingsImgsUrls } = require("../utils/firebase.util");
const { BookingImg } = require("../models/bookingImg.model");
const { PayMethod } = require("../models/payMethod.model");

//direccionamos nuestras variables de entorno de este archivo
dotenv.config({ path: "./config.env" });

//controlador para crear usuario
const createUser = catchAsync(async (req, res, nex) => {
    //nos traemos los campos que queremos crear del body
    const { username, email, password, cellPhone, role } = req.body;

    //vamos a encriptar nuestra contraseña, primero generamos una longitus de código que sea seguro pero que no afecte el rendimeitno de nuestro código
    const salt = await bcrypt.genSalt(12);
    // el metodo hash tiene 2 paramentros, en este caso nuestra contraseña primero y despues el salto
    const hashPassword = await bcrypt.hash(password, salt);

    //creamos un nuevo usuario
    const newUser = await User.create({
        username,
        email,
        password: hashPassword,
        cellPhone,
        role,
    });

    //removemos la contraseña de cualquier consulta
    newUser.password = undefined;

    //le mandamospor el response
    res.status(201).json({
        status: "success",
        data: { newUser },
    });
});

//controlador para traer la cuanta del usuario
const getMyAccount = catchAsync(async (req, res, next) => {
    //nos traemos al usuario adjuntado en nuestro middlewares de userExist
    const { user } = req;
    //mandamos al usuario por el response
    res.status(200).json({
        status: "success",
        data: { user },
    });
});

//controlador para que el usuario actualice sus datos
const updateUser = catchAsync(async (req, res, nex) => {
    //nos traemos al usuario adjuntado en nuestro middlewares de userExist
    const { user } = req;
    //traemos los campos que queremos actualizar
    const { username, password, cellPhone, email } = req.body;
    //actualizamos los campos

    //volvemos a traer los metodos de encriptacion
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    await user.update({ username, email, password: hashPassword, cellPhone });

    //removemos la contraseña
    user.password = undefined;

    //le mandamos la respuesta
    res.status(200).json({
        status: "success",
        data: { user },
    });
});

//controlador para que el usuario se elimine
const deleteUser = catchAsync(async (req, res, nex) => {
    //nos traemos al usuario de la req
    const { user } = req;
    //hacemso el un softDelete para mantener su registro como buena práctica, y jamás usar el destroy.
    await user.update({ status: "deleted" });

    //solo mandamos un 204 y un status success para confrimar que se eliminó
    res.status(204).json({
        status: "success",
    });
});

//constolador para que el usuario se logeé
const login = catchAsync(async (req, res, nex) => {
    //nos traemos el email y la contraseña para entrar del body
    const { email, password } = req.body;

    //validamos si el usuario exite por el email dado
    const user = await User.findOne({ where: { email, status: "active" } });
    //comparamos si las contraseña o el email son correctos
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new AppError("invalid credentials", 400));
    }

    //generamos un token con nuestra libreria jsonwebtoken, este recibe 3 argumentos, el id, una clave cecreta, y cuando expira el token, vamos a dejaslo en 30d para fines de esta prueba
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    //removemos la contraseña por buena práctica
    user.password = undefined;

    res.status(200).json({
        status: "success",
        data: { user, token },
    });
});

//constollador para que el uauario busque sus reservas
const getBookings = catchAsync(async (req, res, next) => {
    const { sessionUser } = req;

    const paymethod = await PayMethod.findAll({ where: { status: "active" } });

    const myBookings = await Booking.findAll({
        where: { userId: sessionUser.id },
        include: { model: BookingImg },
    });

    const bookingsWithImgs = await getBookingsImgsUrls(myBookings);

    if (myBookings[0] === undefined) {
        return next(new AppError("You have no bookings yet", 404));
    }

    res.status(200).json({
        status: "success",
        data: { myBookings: bookingsWithImgs, paymethod },
    });
});

//constollador para que el uauario busque una de sus reservas
const getABooking = catchAsync(async (req, res, next) => {
    const { sessionUser } = req;
    const { id } = req.params;

    const paymethod = await PayMethod.findAll({ where: { status: "active" } });

    paymethod.cardNumber = undefined;

    const myBooking = await Booking.findOne({
        where: { id, userId: sessionUser.id },
    });

    if (myBooking === null) {
        return next(new AppError("You have no bookings yet", 404));
    }

    res.status(200).json({
        status: "success",
        data: { myBooking, paymethod },
    });
});

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    login,
    getMyAccount,
    getBookings,
    getABooking,
};
