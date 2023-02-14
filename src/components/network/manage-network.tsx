import React from "react";
import MyNetwork from "../../media/icons/my-network.png";
import Group from "../../media/icons/group.png";
import Fans from "../../media/icons/fans.png";
import Contact from "../../media/icons/contacts.png";
import Event from "../../media/icons/event.png";
import Hashtag from "../../media/icons/hashtag.png";
import "../../styles/my-network/manage-network.css";

export default function NetworkManage() {
    return(
        <div className="network-manage-cont comp">
            <h2>Manage my network</h2>
            <div className="network-manage-items-cont">

                <a className="network-manage-item">
                    <img className="network-manage-item-img" src={MyNetwork} />
                    <div className="network-manage-item-name">Connections</div>
                    <div className="network-manage-item-count">512</div>
                </a>

                <a className="network-manage-item">
                    <img className="network-manage-item-img" src={Group} />
                    <div className="network-manage-item-name">Groups</div>
                    <div className="network-manage-item-count">5</div>
                </a>

                <a className="network-manage-item">
                    <img className="network-manage-item-img" src={Fans} />
                    <div className="network-manage-item-name">Fans</div>
                    <div className="network-manage-item-count">5</div>
                </a>


                <a className="network-manage-item">
                    <img className="network-manage-item-img" src={Contact} />
                    <div className="network-manage-item-name">Contacts</div>
                    <div className="network-manage-item-count">5</div>
                </a>


                <a className="network-manage-item">
                    <img className="network-manage-item-img" src={Event} />
                    <div className="network-manage-item-name">Events</div>
                    <div className="network-manage-item-count">5</div>
                </a>

                <a className="network-manage-item">
                    <img className="network-manage-item-img" src={Hashtag} />
                    <div className="network-manage-item-name">Hashtags</div>
                    <div className="network-manage-item-count">5</div>
                </a>

            </div>
        </div>
    )
}