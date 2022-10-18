// desestructuramos Sequelize y DataTypes de nuestro ORM (un manejador de bases de datos) "sequelize" // nos puede servir para SQL o mongo
const { Sequelize, DataTypes } = require("sequelize");
//importamos dotenv para ocultar nuestras credenciales ya que son datos sensibles que nadie debe ver
const dotnev = require("dotenv");

// creamos un archivo .env a nivel raiz y le decimos a dotenv de donde va a sarcar lad variables de entorno
dotnev.config({ path: "./config.env" });

const db = new Sequelize({
    // a qué lenguage dirigiremos nuestro orm
    dialect: "postgres",
    //ponemos las credenciales de la base de datos
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB,
    //para que no nos mande mucha info por la consola a cada rato ponemos lo siguiente
    logging: false,
});

//exportaremos la base da datos, y DataTypes de sequelize para crear nuestros modelos, para eso creamos la carpeta models a nivel raiz
module.exports = { db, DataTypes };
