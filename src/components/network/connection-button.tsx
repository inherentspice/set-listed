import handleConnectionClick from "./Handle-Connection-Click";

export default function ConnectionButton(props: {
  connectionStatus: string, 
  user: string, 
  viewingUser: string,
  setConnectionStatus: any,
  setErr: any
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
