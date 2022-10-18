// nos traemos a nuestra aplicación de express
const { app } = require("./app");
const { initModels } = require("./models/initModels");
//2. continuacion del punto 1, traemos la base de datos
const { db } = require("./utils/db.util");

// creamos nuestra variable asincrona para encender el servidor
const startServer = async () => {
    //usamos try catch por si llega a pasar algun error, simplemente por buena práctica
    try {
        //3. continuacion del punto 2, autenticamos la base de datos
        await db.authenticate();

        // aqui traemos la relación de nuestro modelos
        initModels();

        //4. continuacion del punto 3, sincronizamos la base de datos y terminamos aqui el servidor con ella
        await db.sync();

        // vamos a declarar nuestro puerto en una variable para tener la opción de que sea dinámico
        const PORT = 8080; //ponemos el numero que queramos, ideal que no se repita con el de otro proyeto, ya que no pueden estar 2 puertos encendidos a la vez
        const HOST = "0.0.0.0";

        // ponemos nuestra app la escuha de eventos
        app.listen(PORT, HOST, () => {
            console.log(`express app running in http://${HOST}:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};
//ejecutamos el encendido del servidor
startServer();
// 1. despues de esto, vamos a crear nuestra base de datos en utils y la autenticaremos y sincronizaremos dentro de nuestra función de iniciar el servidor
//ahora, a mi en lo particular me gusta crear un atrapador de errores global para la aplicación (eso me ahorrará los trycatch futuros) como buena práctica y despues empezaremos a crear nuestros modelos, luego las rutas, luego los controladores y finalmente los middlewares.
// asi que vamos a crearnos una carpeta de utils, donde iniciaremos nuestro globalErrorHandler que lo dividiremos en 3 partes(catchAsync, app.errro en utils y un controlador para error ).
