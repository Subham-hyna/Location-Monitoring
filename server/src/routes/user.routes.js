import { Router } from "express";
import { authoriseRoles, verifyJWT } from "../middlewares/auth.middleware.js";
import { getAllUsers, getCurrentUser, getSingleUser, login, logoutUser, register } from "../controllers/user.controllers.js";

const router = Router();

router.route("/register")
    .post(register)

router.route("/login")
    .post(login)

router.route("/logout")
    .get(verifyJWT, logoutUser)

router.route("/current-user")
    .get(verifyJWT, getCurrentUser)

router.route("/get-users")
    .get(verifyJWT,authoriseRoles("ADMIN"),getAllUsers)

router.route("/get-user/:id")
    .get(verifyJWT,authoriseRoles("ADMIN"),getSingleUser)

export default router