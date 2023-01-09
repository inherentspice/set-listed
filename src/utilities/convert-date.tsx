export default function convertDate(date: Date): string {
  const dateDifference =  Date.now().valueOf() - date.valueOf();
  const days = Math.floor(dateDifference / (24*60*60*1000));
  // if days === 0, return value in hours
  if (!days) {
    return `${Math.floor(dateDifference / (60 * 60 * 1000))}h`;
  }

  // else return value in days
  return `${days}d`;
}
