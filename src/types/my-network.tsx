export interface RecommendedData {
    id: number,
    name: string,
    img: string,
    backgroundImg: string,
    type: string,
    tagline: string,
    followers: number
}

export interface Connections {
  id: string,
  user: string,
  friends: string[],
  pending: string[],
  waiting: string[]
}
