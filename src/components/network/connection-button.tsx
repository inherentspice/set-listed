
type HandleConnectionClickType = (user: string, viewingUser: string) => Promise<void>;

export default function ConnectionButton(props: {connectionStatus: string, user: string, viewingUser: string, handleConnectionClick: HandleConnectionClickType}) {
  if (props.connectionStatus==="Connect+") {
    return (
      <button className='primary-button' onClick={() => props.handleConnectionClick(props.user, props.viewingUser)}>{props.connectionStatus}</button>
    );
  } else {
    return (
      <button className='pending-button'>{props.connectionStatus}</button>
    );
  }
}
