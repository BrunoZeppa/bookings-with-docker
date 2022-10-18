const { db, DataTypes } = require("../utils/db.util");

const BookingImg = db.define("bookingImg", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    bookingId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    //aqui vendrán las imáges de la tarjeta de crédito por ambos lados(en caso de que se tenga que cobrar la reserva si el usuario no se presenta), la identificacion (por sefuridad del hotel y comprobar la identidad del usuario al momento del checkIn) y una imagen de los datos fiscales para que el hotel pueda hacer la reserva, en caso de que el cliente la solicite.
    imgUrl: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "active",
    },
});

module.exports = { BookingImg };
