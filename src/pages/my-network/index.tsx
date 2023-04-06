import React, { useEffect, useState } from "react";
import NetworkManage from "../../components/network/manage/manage-network";
import NetworkInvitations from "../../components/network/invitations";
import ConnectionService from "../../services/home/connection";
import { Connections } from "../../types/my-network";
import { useUserId } from "../../context/userIdContext";
import ProfileCard from "../../components/home/profile-card/profile-card";
import ProfileService from "../../services/home/profile";
import { ProfileCardData } from "../../types/profile";
import "./index.css";

export default function MyNetwork() {
  const [connections, setConnections] = useState<Connections | undefined>(undefined);
  const [profile, setProfile] = useState<ProfileCardData | undefined>(undefined);
  const { userId } = useUserId();

  useEffect(() => {
    async function fetchConnections() {
      try {
        const userConnections = await ConnectionService.getConnections(userId);
        const userProfile = await ProfileService.getProfileCard(userId);
        setConnections(userConnections.data.connection);
        setProfile(userProfile.data.profileCard[0]);
      } catch (err) {
        console.log(err);
      }
    }
    if (userId) {
      fetchConnections();
    }
  }, [userId]);

  return (
    <div className="network-cont">
      <div className="manage-network-cont">
        <NetworkManage userId={userId} friends={connections ? connections.friends : undefined}/>
        <NetworkInvitations pendingConnections={connections ? connections.waiting : undefined} user={userId}/>
      </div>
      <ProfileCard profile={profile ? profile : null}/>
    </div>
  );
}
