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

export interface FriendId {
  friendId: string
}

export interface Messages {
  content: string,
  user: string,
  createdAt: string
}

export default interface RoomInfo {
  room: Room,
  profileCard: ReducedProfileCard,
  friendId: FriendId,
  messages: Messages
}
