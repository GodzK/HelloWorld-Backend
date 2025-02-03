import { getAllRooms, getRoomById, createRoom } from "../models/roomModel.js";

export const fetchRooms = async (req, res) => {
    try {
        const rooms = await getAllRooms();
        res.status(200).json({ rooms });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch rooms", error: err.message });
    }
};

export const fetchRoomById = async (req, res) => {
    try {
        const room = await getRoomById(req.params.id);
        if (!room) return res.status(404).json({ message: "Room not found" });
        res.status(200).json({ room });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch room", error: err.message });
    }
};

export const addRoom = async (req, res) => {
    try {
        const { name, capacity } = req.body;
        const newRoom = await createRoom(name, capacity);
        res.status(201).json({ message: "Room added successfully", room: newRoom });
    } catch (err) {
        res.status(500).json({ message: "Failed to add room", error: err.message });
    }
};