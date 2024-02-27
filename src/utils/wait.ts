export default async (ms: number = 1) =>
  new Promise((resolve) => setTimeout(resolve, ms));
