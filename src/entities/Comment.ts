import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Blog } from "./Blog";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  content: string = "";

  @ManyToOne(() => User, (user) => user.comments)
  author!: User;

  @ManyToOne(() => Blog, (blog) => blog.comments)
  blog!: Blog;
}
