import { Dispatch, SetStateAction } from "react";
import { User } from "../../../types/my-network";

export default function handleSearchChange(
  e: React.ChangeEvent<HTMLInputElement>,
  friends: User[] | undefined,
  setSearch: Dispatch<SetStateAction<string>>,
  setSearchResults: Dispatch<SetStateAction<User[] | undefined>>
): void{
  setSearch(e.target.value);
  if (friends) {
    const filteredConnections = friends?.filter((friend) => {
      const name = `${friend.firstName} ${friend.lastName}`.toLowerCase();
      if (name.indexOf(e.target.value.toLowerCase()) >= 0) {
        return friend;
      }
    });
    setSearchResults(filteredConnections);
  }
}
