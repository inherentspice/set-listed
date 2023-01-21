export default function shortenText(text: string, length: number): string{
  return text.slice(0, length+1) + "...";
}
