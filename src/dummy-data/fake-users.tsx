import GeorgeCastlesPic from "../media/home/profile-picture.png";
import GeorgeCastlesBG from "../media/home/profile-background.jpg";
import tiktok from "../media/icons/tik-tok.png";
import instagram from "../media/icons/instagram.png";
import youtube from "../media/icons/youtube.png";
import BillBurr from "../media/profile/billburr.png";
import SteveHarvey from "../media/profile/steveharvey.png";
import FeaturedOpenMic from "../media/profile/fake-data-featured-post.png";
import FeaturedGreenRoom from "../media/profile/fake-data-featured-green.png";
import FeaturedWriting from "../media/profile/fake-data-featured-writing.png";
import FeaturedLight from "../media/profile/fake-data-featured-light.png";
import FeaturedAudience from "../media/profile/fake-data-featured-audience.png";
import ImprovHost from "../media/profile/openmic.png";
import Zoom from "../media/profile/zoom.png";


export const FakeUserData = [{
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
  userProfileViews: 2,
  userPostImpressions: 69,
  userSearchAppearances: 500,
  userFollwers: 1234,
  featured: [
    {
      id: 1,
      name: "Open Mic @ Fishies",
      img: FeaturedOpenMic,
      description: "Always such a blast performing at Fishies on Newcastle Road. Great room, supportive regulars, and cheap beer!"
    },
    {
      id: 2,
      name: "Opening for Dewey Parker",
      img: FeaturedGreenRoom,
      description: "It was a dream come true opening for one of my favourite comedians. I've always looked up to this guy, and to see him in the flesh was a real treat. Such an honour to be there!"
    },
    {
      id: 3,
      name: "Writing Session",
      img: FeaturedWriting,
      description: "The writing process is a lot like being a stand-up comedian on stage. You never know what's going to land with the audience, so you just keep throwing out jokes, trying different things, and seeing what works. Just like a comedian, a writer must be willing to take risks and be open to failure in order to create something truly great. It's not always easy to come up with new material, and sometimes it feels like you're bombing on stage, but you have to keep going and keep pushing yourself. And just like a comedian, a writer's best work often comes from those moments when they're taking the biggest risks and putting themselves out there."
    },
    {
      id: 4,
      name: "Open Mic @ Bear & Claw",
      img: FeaturedAudience,
      description: "Last night at the open mic, I may have bombed on stage, but I learned that sometimes the best comedy comes from taking risks and trying new things. I may not have killed it out there, but I'm not going to let that stop me from getting back on stage and giving it another shot. After all, if you're not failing, you're not trying hard enough. #comedyneverdies #keepgrinding"
    },
    {
      id: 5,
      name: "The Light",
      img: FeaturedLight,
      description: "Comedy is like a beacon of light in the darkness, illuminating the human experience and shining a spotlight on the absurdity of life. It's a powerful tool that can bring people together and make us laugh even in the toughest of times. The light of comedy can break through the gloom and remind us of the beauty and wonder that exists in the world. It's a powerful force that can lift our spirits, open our hearts, and remind us that even in the darkest of moments, there is always a glimmer of hope. Like a ray of sunshine on a rainy day, comedy reminds us to keep going, to keep pushing through, and to never lose sight of the light that guides us."
    },
  ],
  groups: [{
    id: 1,
    name:"Open Mic Support Group",
    url: "/groups/openmicsupportgroup"
  }],
  events: [{
    id: 1,
    name:"Sad Mic at Restaurant",
    url: "/events/sadmic"
  }],
  hashtags: [{
    id: 1,
    name:"comedy",
    url:"/hashtags/comedy"
  }],
  socialMedia: [{
    id: 1,
    socialMedia: "instagram",
    img: instagram,
    username: "@GeorgeCastles1",
    followers: 3
  }, {
    id: 2,
    socialMedia: "youtube",
    img: youtube,
    username: "@GeorgeCastles1",
    followers: 14
  }, {
    id: 3,
    socialMedia: "tiktok",
    img: tiktok,
    username: "@GeorgeCastles1",
    followers: 100000
  }],
  about:"I just received the initial deposit for a corporate show in Dubai that's coming up in a couple of weeks. The show pays $8000, yes, that's right, EIGHT THOUSAND US DOLLARS for less than one hour's work! And yes, I'll be flying in First Class as usual, in unbelievable luxury, with a flat bed!  I'll be checking out the indoor ski range, surfing on the sand dunes, visiting the tallest building in the world and the world's largest shopping mall, and luxuriating by the pool at my five star hotel. And yes, I will send pictures!",
  activity: [{
    id: 1,
    date: new Date("January 1, 2023"),
    description: "I truly believe that I am the Bill Burr of the improv stage",
    title: "10 Reasons I am Bill Burr",
    url: "georgecastles.net",
    read: "2 min",
    img: BillBurr,
    likes: 1,
    dislikes: 1035
  }, {
    id: 2,
    date: new Date("December 25, 2022"),
    description: "Steve Harvey's suits are fake and I have the proof they all zip up in the back.",
    title: "Steve Harvey the Liar",
    url: "georgecastles.net",
    read: "24 min",
    img: SteveHarvey,
    likes: 2560,
    dislikes: 1}],
  experience: [{
    id: 1,
    img: ImprovHost,
    title: "Improv Host",
    venue: "Danny's Dive and Beer Shack",
    start: new Date ("Jan 7, 1989"),
    end: new Date(Date.now()),
    location: "Bangkok, Thailand",
    description: "I run a show every night."
  }, {
    id: 2,
    img: Zoom,
    title: "Zoom Mic Host",
    venue: "Zoom",
    start: new Date ("Jan 15, 2020"),
    end: new Date ("Jan 15, 2021"),
    location: "Online",
    description: "I run a digital mic featuring comics from over 2 countries."
  }],
  awards: [
    {
      id: 1,
      title: "Semi-Finalist @ Zonkies Comedy Competition"
    },
    {
      id: 2,
      title: "Voted Best in Show @ Davenport Comedy Festival"
    }
  ]
}];
