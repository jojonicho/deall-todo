import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity("posts")
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  date: Date;

  @Column("text", { nullable: false })
  title: string;

  @Column("text", { nullable: false })
  content: string;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;
}
