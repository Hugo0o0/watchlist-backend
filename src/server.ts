import app from "@/app";
import prisma from "./prisma";

import elastic from "@models/Search/Search";

const port = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV === "development";

app.listen(port, async () => {
  console.log("\x1b[36m%s\x1b[0m", "Connecting to MONGODB...");
  await prisma.$connect();
  if (isDev) {
    console.log("\x1b[36m%s\x1b[0m", "Connecting to ElasticSearch...");
    await elastic.ping();
  }
  console.log(
    "\x1b[33m%s\x1b[0m",
    `Server running on port http://localhost:${port}`
  );
});
