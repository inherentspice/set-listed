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
  content: string,
  createdAt: string
  user: {
    firstName: string,
    lastName: string,
    id: string
  },
  recipient: {
    firstName: string,
    lastName: string,
    id: string
  }
}

export default interface RoomInfo {
  room: Room,
  profileCard: ReducedProfileCard,
  friendId: string,
  messages: Messages[],
}
