
export default function determineConnectionState(
    connections: any,
    setConnectionStatus: any,
    profileCard: any

) {
    if (connections === undefined) {
      setConnectionStatus("friend");
      return;
    }
    const isFriend = connections.friends.filter((friend:any) => profileCard.user === friend.id).length > 0;
    const friendRequestSent = connections.pending.filter((friend:any) => profileCard.user === friend.id).length > 0;
    const isRequestingFriend = connections.waiting.filter((friend:any) => profileCard.user === friend.id).length > 0;
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