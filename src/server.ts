import app from "@/app";
import prisma from "./prisma";

import elastic from "@models/Search/Search";

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  try {
    console.log("\x1b[36m%s\x1b[0m", "Connecting to MONGODB...");
    await prisma.$connect();
    console.log("\x1b[36m%s\x1b[0m", "Connecting to ElasticSearch...");
    await elastic.ping();
    console.log(
      "\x1b[33m%s\x1b[0m",
      `Server running on port http://localhost:${port}`
    );
  } catch (error: any) {
    console.log("\x1b[36m%s\x1b[0m", error.message);
  }
});
