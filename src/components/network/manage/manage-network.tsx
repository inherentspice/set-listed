import React, {useState} from "react";
import MyNetwork from "../../../media/icons/my-network.png";
import "../../../styles/my-network/manage-network.css";
import { User } from "../../../types/my-network";
import ShowExpandedConnections from "./show-expanded-connections";

export default function NetworkManage(props: {friends: User[] | undefined, userId: string}) {
  const [expandedConnections, setExpandedConnections] = useState<boolean>(false);

  function handleViewConnections(): void{
    if (props.friends) {
      setExpandedConnections(!expandedConnections);
    }
  }

  return(
    <div className="network-manage-cont comp">
      <h2>Manage my network</h2>
      <div className="network-manage-items-cont" onClick={() => handleViewConnections()}>
          <img className="network-manage-item-img" src={MyNetwork} />
          <div className="network-manage-item-name">Connections</div>
          <div className="network-manage-item-count">{props.friends ? props.friends.length : 0}</div>
      </div>
      {expandedConnections && <ShowExpandedConnections friends={props.friends} handleViewConnections={handleViewConnections} userId={props.userId}/>}
    </div>
  );
}
