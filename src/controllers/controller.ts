import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Login } from "../entities/User";

export const editBlog = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const blogId = req.params.id;

  const blogRepository = getRepository(Login);
  const blog = await blogRepository.findOne(blogId);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  if (blog.authorId !== userId) {
    return res
      .status(403)
      .json({ message: "You can only edit your own blogs" });
  }

  // proceed with updating the blog
};
