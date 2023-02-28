import React, { useEffect, useState } from "react";
import NetworkManage from "../../components/network/manage-network";
import NetworkInvitations from "../../components/network/invitations";
import NetworkRecommended from "../../components/network/recommended";
import ConnectionService from "../../services/home/connection";
import { Connections } from "../../types/my-network";
import { useUserId } from "../../context/userIdContext";

export default function MyNetwork() {
  const [connections, setConnections] = useState<Connections | undefined>(undefined);
  const { userId } = useUserId();

  useEffect(() => {
    async function fetchConnections() {
      try {
        const userConnections = await ConnectionService.getConnections(userId);
        setConnections(userConnections.data.connection);
      } catch (err) {
        console.log(err);
      }
    }
    if (userId) {
      fetchConnections();
    }
  }, [userId]);

  return (
    <div>
      <NetworkManage />
      {connections && <NetworkInvitations pendingConnections={connections?.waiting} user={userId}/>}
      <NetworkRecommended />
    </div>
  );
}
