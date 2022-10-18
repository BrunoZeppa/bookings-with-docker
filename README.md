# Hotel-bookings-server

Hola!

En los siguentes parrafos, explicaré la lógica y el porque de la estrucura del código.

1. explicacion general del proyecto

Como primer punto se crea una aplcación que tiene usuarios, con el fin de que estos puedan interactuar dentro de ella y sea fácil identificar que usaurio realizó tal acción.

Después el hotel con cuenta de usuario pero con rol de administrador, crear el espacio digital (los cuartos). Los cuales se les puedes poner el precio, el tipo de cuarto, la descripción e inactivarlos en caso de mantenimiento. El "role" del usuario tiene por defautl el status normal, asi que se debe especificar en el body el rol de administrador.

Una vez creado los cuartos, entonces podemos empezar a recibir clientes. Para ello el hotel pondrá al alcance de los clientes la ocpion de reservar la estancia (stay), asi mismo que seleccionen el tipo de cuarto (standar, delux, luxury, ..los cuales ya definió el hotel), el precio, y si el cuarto ya esta ocupado entonces no se mostrara a los usuarios ni al hotel, asi a modo de agilizar los prosesor en front desk del hotel en caso de que tenga reservas presenciales y necesiten saber que cuartos tiene para dar.

Ahi mismo en la reserva el cliente, se deberá mandar las sigueintes imagenes que son enviadas por form-data: tarjeta de credito a modo de garantia por seguridad del hotel, identificaicion oficial y datos de facturacion (en caso de requerir factura). Se pueden enviar hasta 5 imagenes en total por post de reserva. Una vez creada la reserva el status de la habitacion pasará a no-disponible (unavailable), y el hotel lo verá reflejado en su cuenta de administrador.

Si el cliente cancela la reserva, entonces esta pasará a un status "cancelled". Asi mismo el hotel podrá ver todas las reservas sin importar el status.

Tanto las contraseñas como los numeros de tarjetas son encryptados y marcados con undefined, para ocultarlos. Las credenciales de la base de datos tambien son protegidas con dotenv, asi que no se mostraran dentro del repositorio.

Las imagenes son cargadas a la peticion del post de la reserva con ayuda de multer y almacenades en firebase con Disk.storage y las urls de las imagenes son llevadas a la base de datos.

2. explicacion de los enpoints

En el caso de los endpoints que van a recibir las peticiones, solamente pongo 3, el de los usuarios, el de las reservas y el de los cuartos.

-usuarios
Ahi se podran hacer las operaciones básicas CRUD, mas aparte el login del usuario.
El usuario y el hotel podran ver sus reservas y el status de las mismas.

-reservas
Ahi se podran manejar las reservas, asi como subir las imagenes que representan documentacion importante como la identificación, los datos fiscales de la persona u una tarjeta de crédito en garantia

-cuartos
operaciones CRUD y la disponibilidad.

3.documentacion postman

aqui dejo la documentacion del postman

https://documenter.getpostman.com/view/22441822/2s83ziMNkr
# Hotel-bookings-server

Users
POSTCreate User
No request URL found. It will show up here once added.
Aqui se crean los usuarios



Example Request
Create User
curl --location --request POST ''
POSTLogin
No request URL found. It will show up here once added.
Este endpoint es para generar un token de autorización el cual debe ser colocado el los demás endpoints que necesitas validar la sesión del usuario.



Example Request
Login
curl --location --request POST ''
GETGet My Accont
No request URL found. It will show up here once added.
Obtener la session, ya sea del usuario o del hotel



Example Request
Get My Accont
curl --location --request GET ''
PATCHUpdate My Account
No request URL found. It will show up here once added.
actualizar cualquier campo de la cuenta



Example Request
Update My Account
curl --location --request PATCH ''
DELDelete My Account
No request URL found. It will show up here once added.
Hacer un soft-delete de la cuenta



Example Request
Delete My Account
curl --location --request DELETE ''
Rooms
POSTCreate Room
http://localhost:4031/api/v1/rooms
Crear un cuarto, esto se debe de hacer antes de crear la primera reservas



Example Request
Create Room
curl --location --request POST 'http://localhost:4031/api/v1/rooms'
GETGet All Rooms
http://localhost:4031/api/v1/rooms
Obtener todos los cuartos disponibles, tanto para el hotel como para el usuario, los que están ocupados no se mostraran



Example Request
Get All Rooms
curl --location --request GET 'http://localhost:4031/api/v1/rooms'
GETGet A Room
http://localhost:4031/api/v1/rooms
Obtener un cuarto en especifico, si esta ocupado no se mostrará



Example Request
Get A Room
curl --location --request GET 'http://localhost:4031/api/v1/rooms'
PATCHUpdate A Room
http://localhost:4031/api/v1/rooms


Example Request
Update A Room
curl --location --request PATCH 'http://localhost:4031/api/v1/rooms'
DELDelete A Room
http://localhost:4031/api/v1/rooms/1
AUTHORIZATION
Bearer Token
Token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY1MjY3MjAwLCJleHAiOjE2Njc4NTkyMDB9.KmUupjIrL6J--RlBq7VAvtqNg2ZRmACCTZGqrPQBq7Y


Example Request
Delete A Room
curl --location --request DELETE 'http://localhost:4031/api/v1/rooms/1'
GETGet Bookings
http://localhost:4031/api/v1/users/mybookings
Aquí es donde el hotel podrá ver todas sus reservas

AUTHORIZATION
Bearer Token
Token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY1MjY3MjAwLCJleHAiOjE2Njc4NTkyMDB9.KmUupjIrL6J--RlBq7VAvtqNg2ZRmACCTZGqrPQBq7Y


Example Request
Get Bookings
curl --location --request GET 'http://localhost:4031/api/v1/users/mybookings'
GETGet A Booking
No request URL found. It will show up here once added.
Aquí el hotel podrá buscar una reserva en especifico



Example Request
Get A Booking
curl --location --request GET ''
Bookings
POSTUpload PaymentMethod
http://localhost:4031/api/v1/bookings/payment
Aquí el usuario podrá subir su método de pago a un modal, guardando tantas tarjetas quiera, tenindo la comodidad de ya no volver a poner la tarjeta.



Example Request
Upload PaymentMethod
curl --location --request POST 'http://localhost:4031/api/v1/bookings/payment'
POSTCreate Booking
http://localhost:4031/api/v1/bookings/rooms/
Aquí el usuario crea su reserva, mandando adjuntamente la tarjeta una tarjeta de crédito por ambos lados "en foto" a modo de garantía para el hotel, también vía imagen su identificación y una imagen o archivo de sus datos fiscales. las imágenes son almacenadas en firebase y la url en la base de datos nuestra.



Example Request
Create Booking
curl --location --request POST 'http://localhost:4031/api/v1/bookings/rooms/'
PATCHUpdate A Booking
http://localhost:4031/api/v1/bookings/
aquí es cuando el usuario ya pago, y el estatus de la reserva se torna completado.



Example Request
Update A Booking
curl --location --request PATCH 'http://localhost:4031/api/v1/bookings/'
DELDelete A Booking
http://localhost:4031/api/v1/bookings/
aquí es cuando el usuario cancela su reserva, tornando el status "cancelled"
# bookings-with-docker
