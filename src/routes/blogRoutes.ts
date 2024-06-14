import { Router } from "express";
import checkRole from "../middlewares/checkRole";
import {
  addBlog,
  editBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/blogController";

const router = Router();

router.post("/", checkRole(["blogger", "admin"]), addBlog);
router.put("/:id", checkRole(["blogger"]), editBlog);
router.delete("/:id", checkRole(["admin"]), deleteBlog);
router.put("/:id", checkRole(["admin"]), updateBlog);

export default router;
