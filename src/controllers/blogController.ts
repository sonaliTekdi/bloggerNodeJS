import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Blog } from "../entities/Blog";
import { User } from "../entities/User";

export const addBlog = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const user = req.user as User;

  const blogRepository = getRepository(Blog);
  const newBlog = blogRepository.create({
    title,
    content,
    author: user,
  });

  await blogRepository.save(newBlog);
  res.status(201).json(newBlog);
};

export const editBlog = async (req: Request, res: Response) => {
  const user = req.user as User;
  const blogId = req.params.id;
  const { title, content } = req.body;

  const blogRepository = getRepository(Blog);
  const blog = await blogRepository.findOne(blogId);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  if (blog.author.id !== user.id) {
    return res
      .status(403)
      .json({ message: "You can only edit your own blogs" });
  }

  blog.title = title;
  blog.content = content;

  await blogRepository.save(blog);
  res.status(200).json(blog);
};

export const deleteBlog = async (req: Request, res: Response) => {
  const blogId = req.params.id;

  const blogRepository = getRepository(Blog);
  const blog = await blogRepository.findOne(blogId);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  await blogRepository.remove(blog);
  res.status(204).send();
};

export const updateBlog = async (req: Request, res: Response) => {
  const blogId = req.params.id;
  const { title, content } = req.body;

  const blogRepository = getRepository(Blog);
  const blog = await blogRepository.findOne(blogId);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  blog.title = title;
  blog.content = content;

  await blogRepository.save(blog);
  res.status(200).json(blog);
};
