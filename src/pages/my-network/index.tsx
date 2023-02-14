import React from "react";
import NetworkManage from "../../components/network/manage-network";
import NetworkInvitations from "../../components/network/invitations";

export default function MyNetwork() {
  return (
    <div>
      <NetworkManage />
      <NetworkInvitations />
    </div>
  );
}
