//models
const { Booking } = require("./booking.model");
const { BookingImg } = require("./bookingImg.model");
const { PayMethod } = require("./payMethod.model");
const { Room } = require("./room.model");
const { User } = require("./user.model");

//creamos una funcion para iniciar la relación de nuestras tablas en la base de datos
const initModels = () => {
    //un usuario puede tener muchas reservas
    User.hasMany(Booking, { foreignKey: "userId" });
    Booking.belongsTo(User);

    //Un cuarto solo puede estar en una reserva
    Room.hasOne(Booking, { foreignKey: "roomId" });
    Booking.belongsTo(Room);
    //una reserva tiene muchas imagenes, en este caso la imagen de la tarjeta de credito, la identificación de la persona y sus datos de facturación
    Booking.hasMany(BookingImg, { foreignKey: "bookingId" });
    BookingImg.belongsTo(Booking);
    //un usuario puede almacenar diferentes metodos de pago
    User.hasMany(PayMethod, { foreignKey: "userId" });
    PayMethod.belongsTo(User);
};

module.exports = { initModels };
