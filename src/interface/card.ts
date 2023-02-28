import { UserInterface } from "./user";

export interface CardInterface {
  id: string;
  title: string;
  priority: number;
  chat: number;
  attachment: number;
  assignees: UserInterface[];
}