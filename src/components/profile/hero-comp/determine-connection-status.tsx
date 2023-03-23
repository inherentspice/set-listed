import { Dispatch, SetStateAction } from "react";
import { Connections } from "../../../types/my-network";
import { ProfileCardData } from "../../../types/profile";

export default function determineConnectionState(
    connections: Connections | undefined,
    setConnectionStatus: Dispatch<SetStateAction<string>>,
    profileCard: ProfileCardData[]

) {
    if (connections === undefined) {
      setConnectionStatus("friend");
      return;
    }
    const profile = profileCard[0]
    const isFriend = connections.friends.filter((friend) => profile.user === friend.id).length > 0;
    const friendRequestSent = connections.pending.filter((friend) => profile.user === friend.id).length > 0;
    const isRequestingFriend = connections.waiting.filter((friend) => profile.user === friend.id).length > 0;
    if (isFriend) {
      setConnectionStatus("friend");
    } else if (friendRequestSent) {
      setConnectionStatus("Pending");
    } else if (isRequestingFriend) {
      setConnectionStatus("Confirm Request");
    } else {
      setConnectionStatus("Connect+");
    }
  }
