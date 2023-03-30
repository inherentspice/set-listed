import { Dispatch, SetStateAction } from "react";
import handleConnectionClick from "./handle-connection-click";

export default function ConnectionButton(props: {
  connectionStatus: string,
  user: string,
  viewingUser: string,
  setConnectionStatus: Dispatch<SetStateAction<string>>,
  setErr: Dispatch<SetStateAction<boolean>>
}) {
  if (props.connectionStatus==="Connect+") {
    return (
      <button className='primary-button' onClick={() =>handleConnectionClick(props.user, props.viewingUser, props.setConnectionStatus, props.setErr)}>{props.connectionStatus}</button>
    );
  } else {
    return (
      <button className='pending-button'>{props.connectionStatus}</button>
    );
  }
}
