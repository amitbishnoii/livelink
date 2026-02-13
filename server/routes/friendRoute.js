import express from "express"
import { addFriends, getFriends } from "../controllers/friendController.js";

const router = express.Router();

router.post("/friend/add", addFriends);
router.get("/getFriends/:ID", getFriends)

export default router