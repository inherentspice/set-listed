import "../styles/error-message.css";

export default function ErrorMessage() {
  console.log("test")
  return (
    <div className="error-cont">
      <p>You broke something. This isn't on us. Look inwards, then try again.</p>
    </div>
  );
}
