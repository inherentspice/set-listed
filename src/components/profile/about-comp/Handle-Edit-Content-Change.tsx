export function handleEditContentChange(
    e: React.ChangeEvent<HTMLTextAreaElement>,
    setContent: any
    ): void{
    setContent(e.target.value);
  }