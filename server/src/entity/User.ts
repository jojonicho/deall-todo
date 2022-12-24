import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Message } from "./Message";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: false, unique: true })
  email: string;

  @Column("text", { nullable: false, unique: true })
  username: string;

  @Column("text", { nullable: false })
  password: string;

  @Column("bool", { default: false })
  isAdmin: boolean;

  @Column("int", { default: 0 })
  tokenVersion: number;

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];
}
