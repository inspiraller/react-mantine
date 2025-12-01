export const NoOrphans = ({ text }: { text: string }) => {
  const words = text.split(' ');

  if (words.length < 2) {
    return <>{text}</>; // nothing to do
  }

  const lastWord = words.pop();
  const secondLastWord = words.pop();

  return (
    <>
      {words.join(' ')}
      {words.length > 0 ? ' ' : ''}
      <span style={{ display: 'inline-block' }}>
        {secondLastWord} {lastWord}
      </span>
    </>
  );
};
