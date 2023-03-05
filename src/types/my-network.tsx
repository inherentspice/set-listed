export interface RecommendedData {
    id: number,
    name: string,
    img: string,
    backgroundImg: string,
    type: string,
    tagline: string,
    followers: number
}

export interface User {
  connection: string,
  firstName: string,
  lastName: string,
  id: string,
  profileCard: {
    image: string,
    tagline: string
  }
}

export interface Connections {
  id: string,
  user: string,
  friends: User[],
  pending: User[],
  waiting: User[]
}
