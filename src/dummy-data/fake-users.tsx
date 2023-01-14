import BenDoverPic from "../media/home/profile-picture.png";
import BenDoverBG from "../media/home/profile-background.jpg";
import tiktok from "../media/icons/tik-tok.png";
import instagram from "../media/icons/instagram.png";
import youtube from "../media/icons/youtube.png";

export const FakeUserData = {
  userFirstName: "Ben",
  userLastName: "Dover",
  city: "Bangkok",
  country: "Thailand",
  id: 12345,
  category: "Comedy",
  subCategory: "Improv Comedian",
  userProfilePicture: BenDoverPic,
  userBackgroundPicture: BenDoverBG,
  userTagline: "The show didn't get canceled, I quit.",
  userProfileViews: 1,
  userPostImpressions: 69,
  groups: [{id: 1, name:"Open Mic Support Group", url: "/groups/openmicsupportgroup"}],
  events: [{id: 2, name:"Sad Mic at Restaurant", url: "/events/sadmic"}],
  hashtags: [{id: 3, name:"comedy", url:"/hashtags/comedy"}],
  socialMedia: [{id: 4, socialMedia: "instagram", img: instagram, username: "@bendover69", followers: 3}, { id: 5, socialMedia: "youtube", img: youtube, username: "@BenDover69", followers: 14}, { id: 6, socialMedia: "tiktok", img: tiktok, username: "@BenChiling", followers: 100000}]
}