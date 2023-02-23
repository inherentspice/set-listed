export interface AboutData {
  user: string,
  id: string,
  content: string
}

export interface AwardData {
  user: string,
  id: string,
  content: string
}

export interface AwardDataSend {
  user: string,
  content: string
}

export interface ExperienceData {
  content: string,
  title: string,
  id: string,
  user: string,
  venue: string,
  dateStart?: string,
  dateEnd?: string,
  location?: string
}

export interface ExperienceDataSend {
  content: string,
  title: string,
  id?: string,
  user: string,
  venue: string,
  dateStart?: string,
  dateEnd?: string,
  location?: string
}

export interface FeaturedData {
  user: string,
  image?: string,
  cloudinaryId?: string,
  title: string,
  content: string,
  id: string
}

export interface PostData {
  content: string,
  likes: string[],
  user: string,
  createdAt: string,
  id: string
}

export interface PostDataSend {
  content: string,
  user: string
}

export interface ProfileCardData {
  firstName: string,
  lastName: string,
  user: string,
  country: string,
  city: string,
  id: string,
  image: string,
  socials: string[],
  tagline: string,
  backgroundImage: string,
  backgroundCloudinaryId: string,
  userPostImpressions: number,
  userProfileViews: number,
}

export interface ProfileCardDataSend {
  firstName: string,
  lastName: string,
  country: string,
  city: string,
  socials: string[],
  tagline: string
}

export interface SkillData {
  user: string,
  content: string,
  endorsments: number,
  id: string,
}

export interface SkillDataSend {
  user: string,
  content: string,
}

export default interface ProfileData {
  about: AboutData[],
  award: AwardData[],
  experience: ExperienceData[],
  featured: FeaturedData[],
  post: PostData[],
  profileCard: ProfileCardData[],
  skill: SkillData[]
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProfileCardItems extends Array<ProfileCardData>{}
