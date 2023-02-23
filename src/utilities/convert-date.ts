export default function convertDate(dateString: string): string{
  const now = new Date();
  const date = new Date(dateString);
  const timeDifference = Math.abs(now.valueOf() - date.valueOf()) / 1000;

  const minutes = Math.floor(timeDifference / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const remainingMinutes = minutes % 60;
  const remainingSeconds = Math.floor(timeDifference % 60);

  let result = "";

  switch(true) {
    case days > 0:
      result = days + "d";
      break;
    case hours > 0:
      result = hours + "h";
      break;
    case remainingMinutes > 0:
      result = remainingMinutes + "m";
      break;
    default:
      result = remainingSeconds + "s";
      break;
  }

  return result;
}
