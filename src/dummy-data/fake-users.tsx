import GeorgeCastlesPic from "../media/home/profile-picture.png";
import GeorgeCastlesBG from "../media/home/profile-background.jpg";
import tiktok from "../media/icons/tik-tok.png";
import instagram from "../media/icons/instagram.png";
import youtube from "../media/icons/youtube.png";
import BillBurr from "../media/profile/billburr.png";
import SteveHarvey from "../media/profile/steveharvey.png";
import FeaturedOpenMic from "../media/profile/fake-data-featured-post.png";
import FeaturedGreenRoom from "../media/profile/fake-data-featured-green.png";
import ImprovHost from "../media/profile/openmic.png";
import Zoom from "../media/profile/zoom.png";


export const FakeUserData = {
  userFirstName: "George",
  userLastName: "Castles",
  city: "Bangkok",
  country: "Thailand",
  id: 12345,
  category: "Comedy",
  subCategory: "Improv Comedian",
  userProfilePicture: GeorgeCastlesPic,
  userBackgroundPicture: GeorgeCastlesBG,
  userTagline: "The show didn't get canceled, I quit.",
  userProfileViews: 1,
  userPostImpressions: 69,
  userFollwers: 1234,
  featured: [
    {
      id: 1,
      name: "Open Mic @ Fishies",
      img: FeaturedOpenMic,
      description: "Always such a blast performing at Fishies on Newcastle Road. Great room, supportive regulars, and cheap beer!"},
    {
      id: 2,
      name: "Opening for Dewey Parker",
      img: FeaturedGreenRoom,
      description: "It was a dream come true opening for one of my favourite comedians. I've always looked up to this guy, and to see him in the flesh was a real treat."}
  ],
  groups: [{
    id: 1,
    name:"Open Mic Support Group",
    url: "/groups/openmicsupportgroup"
  }],
  events: [{
    id: 2,
    name:"Sad Mic at Restaurant",
    url: "/events/sadmic"
  }],
  hashtags: [{
    id: 3,
    name:"comedy",
    url:"/hashtags/comedy"
  }],
  socialMedia: [{
    id: 4,
    socialMedia: "instagram",
    img: instagram,
    username: "@GeorgeCastles1",
    followers: 3
  }, {
    id: 5,
    socialMedia: "youtube",
    img: youtube,
    username: "@GeorgeCastles1",
    followers: 14
  }, {
    id: 6,
    socialMedia: "tiktok",
    img: tiktok,
    username: "@GeorgeCastles1",
    followers: 100000
  }],
  about:"I just received the initial deposit for a corporate show in Dubai that's coming up in a couple of weeks. The show pays $8000, yes, that's right, EIGHT THOUSAND US DOLLARS for less than one hour's work! And yes, I'll be flying in First Class as usual, in unbelievable luxury, with a flat bed!  I'll be checking out the indoor ski range, surfing on the sand dunes, visiting the tallest building in the world and the world's largest shopping mall, and luxuriating by the pool at my five star hotel. And yes, I will send pictures!",
  activity: [{
    id: 7,
    date: new Date("January 1, 2023"),
    description: "I truly believe that I am the Bill Burr of the improv stage",
    title: "10 Reasons I am Bill Burr",
    url: "georgecastles.net",
    read: "2 min",
    img: BillBurr,
    likes: 1,
    dislikes: 1035
  }, {
    id: 8,
    date: new Date("December 25, 2022"),
    description: "Steve Harvey's suits are fake and I have the proof they all zip up in the back.",
    title: "Steve Harvey the Liar",
    url: "georgecastles.net",
    read: "24 min",
    img: SteveHarvey,
    likes: 2560,
    dislikes: 1}],
  experience: [{
    id: 9,
    img: ImprovHost,
    title: "Improv Host",
    venue: "Danny's Dive and Beer Shack",
    start: "Jan 7, 1989",
    end: "Present",
    location: "Bangkok, Thailand",
    description: "I run a show every night."
  }, {
    id: 10,
    img: Zoom,
    title: "Zoom Mic Host",
    venue: "Zoom",
    start: "Jan 15, 2020",
    end: "Jan 15, 2021",
    location: "Online",
    description: "I run a digital mic featuring comics from over 2 countries."
  }]
};
