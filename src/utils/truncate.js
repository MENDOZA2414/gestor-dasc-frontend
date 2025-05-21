export const truncateMiddle = (text, max = 28) => {
  if (text.length <= max) return text;
  const extMatch = text.match(/\.[a-z0-9]+$/i);
  const ext = extMatch ? extMatch[0] : '';
  const name = ext ? text.slice(0, -ext.length) : text;
  const start = name.slice(0, max - ext.length - 3);
  return `${start}...${ext}`;
};
