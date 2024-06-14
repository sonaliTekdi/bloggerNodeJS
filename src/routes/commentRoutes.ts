import { Router } from "express";
import checkRole from "../middlewares/checkRole";
import { addComment, deleteComment } from "../controllers/commentController";

const router = Router();

router.post("/", checkRole(["user"]), addComment);
router.delete("/:id", checkRole(["admin"]), deleteComment);

export default router;
