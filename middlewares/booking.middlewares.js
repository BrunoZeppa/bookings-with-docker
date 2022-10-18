//repetimos el mismo proceso que los otro para validar la reserva
const { Booking } = require("../models/booking.model");
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const bookingExist = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const booking = await Booking.findOne({ where: { id } });

    if (!booking) {
        return next(new AppError("booking not found", 404));
    }

    req.booking = booking;
    next();
});

module.exports = { bookingExist };
