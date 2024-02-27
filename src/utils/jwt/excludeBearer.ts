const excludeBearer = (token: string) => {
  const splittedToken = token.split(" ");
  if (splittedToken.length !== 2) return token;
  return splittedToken[1];
};

export default excludeBearer;
