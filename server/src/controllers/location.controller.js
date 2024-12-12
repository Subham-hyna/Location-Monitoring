import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {User} from "../models/user.model.js";
import {Location} from "../models/location.model.js";


/**
 * Add a user Location
 */
export const addLocation = asyncHandler(async (req, res, next) => {
    const { userId, latitude, longitude } = req.body;

    if (!userId || !latitude || !longitude ) {
        return next(new ApiError(400, "All fields are required"));
    }

    const user = await User.exists({_id : userId});

    if (!user) {
        return next(new ApiError(400, "User doesn't exist"));
    }

    const newLocation = await Location.create({
        userId,
        latitude,
        longitude,
    });

    if (!newLocation) {
        return next(new ApiError(400, "Error in adding new Location"));
    }

    res
    .status(201)
    .json(
        new ApiResponse(201,{location: newLocation},"Location added successfully")
    )
})

/**
 * Get a single user all Locations
 */
export const getUserLocations = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;

        if (!userId) {
            return next(new ApiError(400, "All fields are required"));
        }

        const locations = await Location.find({ userId }).sort({ createdAt: -1 }).limit(100).populate("userId","name ");
        
        res
        .status(201)
        .json(
            new ApiResponse(201,{locations},"Locations retrieved successfully")
        )
})