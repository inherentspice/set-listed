export default function convertDateRange(start: Date, end: Date): string {
    const dateDifference =  end.valueOf() - start.valueOf();
    const years = Math.floor(dateDifference / (24*60*60*1000*365));
    // if days === 0, return value in hours
    if (!years) {
        return `${Math.floor(dateDifference / (24 * 60 * 60 * 1000 * 30))}m`;
    }
    if (years==1) {
        return `${years} year`
    }

    // else return value in days
    return `${years} years`;
}