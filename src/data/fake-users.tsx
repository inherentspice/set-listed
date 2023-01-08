import { url } from "inspector";
import BenDoverPic from '../media/home/profile-picture.png';

export default function FakeUsers() {

    interface fakeUserObject {
        firstName: string,
        lastName: string,
        id: number,

      }
    
      const fakeUsers: fakeUserObject[] = [
        {
          firstName: 'Ben',
          lastName: 'Dover',
          id: 69,

        },
    ]

}