import { getUserById } from "../models/userModel.js";

export const getUser = async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    
    if (isNaN(userId)) {
        return res.status(400).json({
            process: "unsuccessful",
            data: null,
            message: "Invalid user ID",
        });
    }

    try {
        const userdata = await getUserById(userId);
        
        if (!userdata) {
            return res.status(404).json({
                process: "unsuccessful",
                data: null,
                message: "User not found",
            });
        }

        return res.status(200).json({
            process: "success",
            data: userdata,
            message: "User fetched successfully",
        });
    } catch (err) {
        return res.status(500).json({
            process: "unsuccessful",
            data: null,
            message: "Error retrieving user data",
        });
    }
};
