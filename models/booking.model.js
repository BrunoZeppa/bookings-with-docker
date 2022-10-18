//utils
const { db, DataTypes } = require("../utils/db.util");

//para las reservas usaremos la palabra booking, que es mas apropiada para referirnos a una reserva de hotel, en lugar de reservation
const Booking = db.define("booking", {
    //el id es indispensable en cualquier modelo
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    //esta el la llave foranea que conecta con el usuario
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    //esta el la llave foranea que conecta la reserva con el cuarto elegido, en ella se adjuntará el tipo de cuato que scogió el usuario
    roomId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    //nombre completo para que el hotel sepa a nombre de quien esta la reserva
    stay: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    //la diferencia de dias entre el checkIn y el checkOut * el precio de la habitacíon
    totalPrice: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    //Una ves creada una reserva el status por defecto será pendiente, hasta que llega a su checkIn será completada, y si cancela con 24 hrs de anticipacion, será cancelada
    status: {
        defaultValue: "pending",
        allowNull: false,
        type: DataTypes.STRING,
    },
});

module.exports = { Booking };
