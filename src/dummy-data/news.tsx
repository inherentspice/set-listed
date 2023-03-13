interface newsDataObject {
  title: string,
  posted: Date,
  readCount: number,
}

const newsData: newsDataObject[] = [
  {
    title: "What is the deal with...?",
    posted: new Date("December 12, 2022"),
    readCount: 3,
  },
  {
    title: "Welcome to AI assisted comedy",
    posted: new Date("January 2, 2023"),
    readCount: 12,
  },
  {
    title: "Stand-up in the meta-verse",
    posted: new Date("December 27, 2022"),
    readCount: 32,
  },
  {
    title: "Zoom show crowdwork: study",
    posted: new Date("December 29, 2022"),
    readCount: 1,
  },
  {
    title: "What's happening to 'woke' comedy in the UK?",
    posted: new Date("January 3, 2023"),
    readCount: 41
  }
];

export default newsData;
