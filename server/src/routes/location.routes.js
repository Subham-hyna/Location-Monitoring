import { Router } from "express";
import { authoriseRoles, verifyJWT } from "../middlewares/auth.middleware.js";
import { addLocation, getUserLocations } from "../controllers/location.controller.js";

const router = Router();

router.route("/addLocation")
    .post(verifyJWT, addLocation)

router.route("/get-location/:userId")
    .get(verifyJWT,authoriseRoles("ADMIN"), getUserLocations)

export default router