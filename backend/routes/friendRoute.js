import express from "express"
import { addFriends } from "../controllers/friendController";

const router = express.Router();

router.post("/friend/add", addFriends);

export default router