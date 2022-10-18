//importamos la base de datos y los DataTypes de utils
const { db, DataTypes } = require("../utils/db.util");
//creamos nuestro usuario
const Room = db.define("room", {
    //el id es indispensable en cualquier modelo
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    roomType: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    //declaramos el email como dato unico, asi nuestor globalErrorHandler mandara el error si se repite el correo en otra cuenta
    price: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    //el status puede ser ocupado o desocupado de acuerdo a la estancia de los usuarios
    status: {
        defaultValue: "available",
        allowNull: false,
        type: DataTypes.STRING,
    },
});

//por último exportamos nuestro modelo de usuario
module.exports = { Room };
