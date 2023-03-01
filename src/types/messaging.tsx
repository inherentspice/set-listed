import { User } from "./my-network";

export interface Room {
  participants: string[],
  messages: string[],
  createdAt: string,
  modified: string,
  id: string,
}

export interface ReducedProfileCard {
  firstName: string,
  lastName: string,
  image: string
}

export interface Messages {
  id: string,
  content: string,
  createdAt: string,
  user: User,
  recipient: User
}

export default interface RoomInfo {
  room: Room,
  profileCard: ReducedProfileCard,
  friendId: string,
  messages: Messages[],
}
