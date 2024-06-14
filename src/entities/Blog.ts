import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  title: string = "";

  @Column()
  content: string = "";

  @ManyToOne(() => User, (user) => user.blogs)
  author!: User;

  @OneToMany(() => Comment, (comment) => comment.blog)
  comments!: Comment[];
}
