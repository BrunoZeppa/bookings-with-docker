const express = require("express");

const bookingsRouter = express.Router();
//utils
const { upload } = require("../utils/multer.util");

//controllers
const {
    createBooking,
    updateBooking,
    deleteBooking,
    uploadPayMethodToModal,
} = require("../controllers/bookings.controllers");

//middlewares
const {
    protectSession,
    protectBookingsOwners,
} = require("../middlewares/auth.middlewares");
const { bookingExist } = require("../middlewares/booking.middlewares");
const { roomExist } = require("../middlewares/room.middlewares");

bookingsRouter.use(protectSession);
//creamos una reserva en la url del cuarto
bookingsRouter.post(
    "/room/:id",
    upload.array("bookingImg", 5),
    roomExist,
    createBooking
);

bookingsRouter.post("/payment", uploadPayMethodToModal);

bookingsRouter.patch("/:id", bookingExist, updateBooking);
//añadimos los midlewares para proteger nuestras reservas
bookingsRouter.delete(
    "/:id",
    bookingExist,
    protectBookingsOwners,
    deleteBooking
);

module.exports = { bookingsRouter };
