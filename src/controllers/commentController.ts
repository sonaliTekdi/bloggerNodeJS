import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Comment } from "../entities/Comment";
import { User } from "../entities/User";
import { Blog } from "../entities/Blog";

export const addComment = async (req: Request, res: Response) => {
  const { content, blogId } = req.body;
  const user = req.user as User;

  const blogRepository = getRepository(Blog);
  const blog = await blogRepository.findOne(blogId);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  const commentRepository = getRepository(Comment);
  const newComment = commentRepository.create({
    content,
    author: user,
    blog,
  });

  await commentRepository.save(newComment);
  res.status(201).json(newComment);
};

export const deleteComment = async (req: Request, res: Response) => {
  const commentId = req.params.id;

  const commentRepository = getRepository(Comment);
  const comment = await commentRepository.findOne(commentId);

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  await commentRepository.remove(comment);
  res.status(204).send();
};
