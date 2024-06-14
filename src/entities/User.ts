import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Blog } from "./Blog";
import { Comment } from "./Comment";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  token!: string;
  @Column()
  role!: string;

  @OneToMany(() => Blog, (blog) => blog.author)
  blogs!: Blog[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments!: Comment[];
}
