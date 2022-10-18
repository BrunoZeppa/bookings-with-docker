const { Room } = require("../models/room.model");
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const getAllRooms = catchAsync(async (req, res, next) => {
    const rooms = await Room.findAll({ where: { status: "available" } });
    res.status(200).json({
        status: "success",
        data: { rooms },
    });
});
const getARoom = catchAsync(async (req, res, next) => {
    //buscamos el cuerto desocupado y ya encontrado por el middlewares de cuarto
    const { room } = req;

    res.status(200).json({
        status: "success",
        data: { room },
    });
});
const createRoom = catchAsync(async (req, res, next) => {
    const { roomType, price, description } = req.body;

    const newRoom = await Room.create({ roomType, price, description });

    res.status(201).json({
        status: "success",
        data: { newRoom },
    });
});
const updateRoom = catchAsync(async (req, res, next) => {
    const { room } = req;

    res.status(200).json({
        status: "success",
        data: { room },
    });
});
const deleteRoom = catchAsync(async (req, res, next) => {
    const { room } = req;

    await room.update({ status: "deleted" });

    res.status(204).json({
        status: "success",
    });
});

module.exports = { getAllRooms, getARoom, createRoom, updateRoom, deleteRoom };
