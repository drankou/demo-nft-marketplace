export const truncateAddress = (address: string) => {
  let first = address.slice(0, 14);
  let last = address.slice(-8);
  return `${first}...${last}`;
};
