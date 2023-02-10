type userFeatured = {
  id: string,
  name: string,
  img: string,
  description: string
}

type userGroup = {
  id: string,
  name: string,
  url: string,
}

type userEvents = {
  id: string,
  name: string,
  url: string
}

type userHashtags = {
  id: string,
  name: string,
  url: string
}

type userSocialMedia = {
  id: string,
  socialMedia: string,
  img: string,
  username: string,
  followers: number
}

type userActivity = {
  id: string,
  date: Date,
  description: string,
  title: string,
  url: string,
  read: string,
  img: string,
  likes: number,
  dislikes: number
}

type userExperience = {
  id: string,
  img: string,
  name: string,
  venue: string,
  start: Date,
  end: Date,
  location: string,
  description: string
}

type userAwards = {
  id: string,
  name: string
}

export type fullUserInfo = {
    user: string,
    userFirstName: string,
    userLastName: string,
    city: string,
    country: string,
    id: string,
    category: string,
    subCategorey: string,
    userProfilePicture: string,
    userBackgroundPicture: string,
    userTagline: string,
    userProfileViews: number,
    userPostImpressions: number,
    userFollowers: number,
    featured: userFeatured[],
    groups: userGroup[],
    events: userEvents[],
    hashtags: userHashtags[],
    socialMedia: userSocialMedia[],
    about: string,
    activity: userActivity[],
    experience: userExperience[],
    awards: userAwards[]
  }