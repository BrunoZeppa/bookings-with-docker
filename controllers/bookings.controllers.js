const { catchAsync } = require("../utils/catchAsync.util");
const bcrypt = require("bcryptjs");

//models
const { Booking } = require("../models/booking.model");
const { uploadBookingImgs } = require("../utils/firebase.util");
const { PayMethod } = require("../models/payMethod.model");

const createBooking = catchAsync(async (req, res, next) => {
    //nos traemos las llaves primarias que queremos asingnar en nuestra reserva
    const { sessionUser, room } = req;
    //nos traemos los campos que queremos crear del body
    const { stay } = req.body;

    const newBooking = await Booking.create({
        userId: sessionUser.id,
        roomId: room.id,
        stay,
        totalPrice: stay * room.price,
    });

    await uploadBookingImgs(req.files, newBooking.id);

    //actualizamos el estado de la habitación a ocupada
    await room.update({ status: "unavailable" });

    res.status(201).json({
        status: "success",
        data: { newBooking },
    });
});
const updateBooking = catchAsync(async (req, res, next) => {
    //aqui se actualiza la reserva una vez que l usuario ha llegedo y pagado su estancia
    const { booking } = req;

    await booking.update({ status: "completed" });

    res.status(200).json({
        status: "success",
        data: { booking },
    });
});
const deleteBooking = catchAsync(async (req, res, next) => {
    const { booking } = req;
    //por si el usuario cancela antes de su check in

    await booking.update({ status: "cancelled" });

    res.status(204).json({
        status: "success",
    });
});

const uploadPayMethodToModal = catchAsync(async (req, res, next) => {
    const { payType, cardNumber } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hashedCard = await bcrypt.hash(cardNumber, salt);

    const newPayMethod = await PayMethod.create({
        userId: sessionUser.id,
        payType,
        cardNumber: hashedCard,
    });

    newPayMethod.cardNumber = undefined;

    res.status(200).json({
        status: "success",
        data: { newPayMethod },
    });
});

module.exports = {
    createBooking,
    updateBooking,
    deleteBooking,
    uploadPayMethodToModal,
};
