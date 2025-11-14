import express from "express";
import { getUser, searchUser, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/updateInfo", updateUser);
router.get("/searchUser", searchUser);
router.get("/getID/:username", getUser);

export default router;