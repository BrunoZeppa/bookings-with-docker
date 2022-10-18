//primero importamos express
const express = require("express");
//metemos express en una variable, en este caso a mi me parece de buena pratica llamarla app
const app = express();
// le decimos a la aplicacion que reciba JSON
app.use(express.json());

//controllers
const { globalErrorHandler } = require("./controllers/error.controllers");

//routes
const { usersRouter } = require("./Routes/users.routes");
const { bookingsRouter } = require("./Routes/bookings.routes");
const { roomsRouter } = require("./Routes/rooms.routes");

//endpoints( creamos una carpeta de rutas donde va el router de los verbos o peticiones)
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/bookings", bookingsRouter);
app.use("/api/v1/rooms", roomsRouter);

//aqui ponemos nuestro manejador de errores globles, justo abajo de nuestro endpoints
app.use(globalErrorHandler);

//cuaqluier endpoint que no exista en nuestro servidor lo vamos a cachar aqui abajo
app.all("*", (req, res) => {
    res.status(404).json({
        status: "error",
        message: `${req.method} ${req.url} doesn't exist in our server`,
    });
});
//exportamos la app y creamos el servidor en otro archivo para tener un mejor orden
module.exports = { app };
