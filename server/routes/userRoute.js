import express from "express";
import { getUser, searchUser, updateUser } from "../controllers/userController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/updateInfo", upload.single("image"), updateUser);
router.get("/searchUser", searchUser);
router.get("/getID/:username", getUser);

export default router;