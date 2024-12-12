import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { sendToken } from "../utils/sendToken.js";
import { ApiFeatures } from "../utils/apiFeatures.js";
import { USER_RESULT_PER_PAGE } from "../constants.js";

/**
 * Register a new user
 */
export const register = asyncHandler(async (req, res, next) => {
    const { name, username, password } = req.body;

    // Validate required fields
    if ([name, username, password].some((field) => field.trim() === "")) {
        return next(new ApiError(400, "All fields are required"));
    }

    //For initialization of ADMIN (for reviewing of the code can be removed afterwards)
    const admin = await User.exists({username:"admin"})
    if(!admin){
        const user = await User.create({ name:"ADMIN", username:"admin", password:"123456", role:"ADMIN" });
    }

    // Check if user already exists
    const userExist = await User.exists({ username });
    if (userExist) {
        return next(new ApiError(400, "User already exists for this username"));
    }

    // Create a new user
    const user = await User.create({ name, username, password });

    if (!user) {
        return next(new ApiError(400, "Error while registering the user"));
    }

    res.status(201).json(
        new ApiResponse(201, { user }, "User created successfully")
    );
});

/**
 * Log in a user
 */
export const login = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
        return next(new ApiError(400, "All fields are required"));
    }

    // Find user by username
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
        return next(new ApiError(400, "User doesn't exist"));
    }

    // Validate password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        return next(new ApiError(400, "Invalid user credentials"));
    }

    sendToken(user, 200, res, "Logged in successfully");
});

/**
 * Log out the current user
 */
export const logoutUser = asyncHandler(async (req, res, next) => {
    const options = {
        httpOnly: true,
        secure: true,
    };

    res
        .status(200)
        .clearCookie("Location_accessToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

/**
 * Get the current logged-in user
 */
export const getCurrentUser = asyncHandler(async (req, res, next) => {
    res.status(200).json(
        new ApiResponse(200, { user: req.user }, "User fetched successfully")
    );
});

/**
 * Get all users except the current user
 */
export const getAllUsers = asyncHandler(async (req, res, next) => {
    const resultPerPage = USER_RESULT_PER_PAGE;

    // Filter and sort users
    let apiFeatures = new ApiFeatures(
        User.find({ _id: { $ne: req.user._id } }).sort({ createdAt: -1 }),
        req.query
    ).searchUser();

    const userFilteredCount = await apiFeatures.query.countDocuments();

    // Apply pagination
    apiFeatures = new ApiFeatures(
        User.find({ _id: { $ne: req.user._id } }).sort({ createdAt: -1 }),
        req.query
    ).searchUser().pagination(resultPerPage);

    const users = await apiFeatures.query;

    res.status(200).json(
        new ApiResponse(200, {
            users,
            resultPerPage,
            userFilteredCount,
        }, "Users fetched successfully")
    );
});

/**
 * Get a single user by ID
 */
export const getSingleUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ApiError(404, "User doesn't exist"));
    }

    res.status(200).json(
        new ApiResponse(200, { user }, "User fetched successfully")
    );
});
