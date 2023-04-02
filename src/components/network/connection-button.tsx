import { Dispatch, SetStateAction } from "react";
import handleConnectionClick from "./handle-connection-click";
import { useNavigate } from "react-router-dom";

export default function ConnectionButton(props: {
  connectionStatus: string,
  user: string,
  viewingUser: string,
  setConnectionStatus: Dispatch<SetStateAction<string>>,
  setErr: Dispatch<SetStateAction<boolean>>
}) {
  const navigate = useNavigate();

  if (props.connectionStatus==="Connect+") {
    return (
      <button className="primary-button" onClick={() => handleConnectionClick(props.user, props.viewingUser, props.setConnectionStatus, props.setErr)}>{props.connectionStatus}</button>
    );
  } else if (props.connectionStatus==="Confirm Request") {
    return (
      <button className="primary-button" onClick={() => navigate("/my-network")}>{props.connectionStatus}</button>
    );
  }else {
    return (
      <button className='pending-button'>{props.connectionStatus}</button>
    );
  }
}
