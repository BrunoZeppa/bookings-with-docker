const express = require("express");
const roomsRouter = express.Router();

//constrollers
const {
    createRoom,
    updateRoom,
    deleteRoom,
    getARoom,
    getAllRooms,
} = require("../controllers/rooms.controllers");

//middlewares
const {
    protectSession,
    protectAdmin,
} = require("../middlewares/auth.middlewares");
const { roomExist } = require("../middlewares/room.middlewares");
const {
    createRoomsValidators,
} = require("../middlewares/validations.middlewares");

//aca la gente puede consultar los cuartos disponibles
roomsRouter.get("/", getAllRooms);
roomsRouter.get("/:id", roomExist, getARoom);

//aca solo el hotel(un usuario con status admin) podré crear, actualizar y eliminar los cuartos
roomsRouter.use(protectSession);
roomsRouter.post("/", protectAdmin, createRoomsValidators, createRoom);
roomsRouter.patch("/:id", roomExist, protectAdmin, updateRoom);
roomsRouter.delete("/:id", roomExist, protectAdmin, deleteRoom);

module.exports = { roomsRouter };
