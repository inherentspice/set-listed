import React from "react";
import NetworkManage from "../../components/network/manage-network";
import NetworkInvitations from "../../components/network/invitations";
import NetworkRecommended from "../../components/network/recommended";

export default function MyNetwork() {
  return (
    <div>
      <NetworkManage />
      <NetworkInvitations />
      <NetworkRecommended />
    </div>
  );
}
