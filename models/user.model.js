//importamos la base de datos y los DataTypes de utils
const { db, DataTypes } = require("../utils/db.util");
//creamos nuestro usuario
const User = db.define("user", {
    //el id es indispensable en cualquier modelo
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    username: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    //declaramos el email como dato unico, asi nuestor globalErrorHandler mandara el error si se repite el correo en otra cuenta
    email: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    //en caso de que el hotel necesite saber la hora de su llegada, o si hay algún problema con su reserva
    cellPhone: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    //declaramos un status por si queremos tener otros usuarios que sean administradores, vendedores etc.. y tengan nivel de acceso, puede que no se usen pero se ponen por buena práctica
    role: {
        defaultValue: "normal",
        allowNull: false,
        type: DataTypes.STRING,
    },
    //Igual que el id, todo modelo debe llevar un status, en el caso del usuario, si esta activo, baneado, eliminado..  dentro de nuestra aplicación
    status: {
        defaultValue: "active",
        allowNull: false,
        type: DataTypes.STRING,
    },
});

//por último exportamos nuestro modelo de usuario
module.exports = { User };
