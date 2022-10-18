//importamos expres
const express = require("express");
//declaramos nuestro router
const usersRouter = express.Router();

//constrollers
const {
    getMyAccount,
    updateUser,
    deleteUser,
    login,
    createUser,
    getABooking,
    getBookings,
} = require("../controllers/users.controllers");

//middlewares
const { userExist } = require("../middlewares/users.middlewares");
const {
    protectSession,
    protectUsersAccount,
} = require("../middlewares/auth.middlewares");
const {
    createUserValidators,
} = require("../middlewares/validations.middlewares");

//declaramos los verbos que se van a usar:

//la de crear a un usuario y le añadimos condiciones para la creación con nuestra librería de express-validatro
usersRouter.post("/register", createUserValidators, createUser);
//login del usuario
usersRouter.post("/login", login);

//protegemos la session, para eso creamos un middleware de autorizacion
usersRouter.use(protectSession);
//que el hotel y el usuario puedan consultar las reservas
usersRouter.get("/mybookings", getBookings);
//que el hotel y el usuario puedan consultar una de las revservas
usersRouter.get("/mybookings/:id", getABooking);

usersRouter.get("/:id", userExist, getMyAccount);
//que el usuario pueda actualizar sus datso
usersRouter.patch("/:id", userExist, protectUsersAccount, updateUser);
//que el usuario pueda eliminar sus datso
usersRouter.delete("/:id", userExist, protectUsersAccount, deleteUser);

//exportamos nuestro router hacia app
module.exports = { usersRouter };
