import app from "@/app";
import prisma from "./prisma";
import fs from "fs";
import path from "path";
import elastic from "@models/Search/Search";

const port = process.env.PORT || 3000;

import { Client } from "@elastic/elasticsearch";

app.listen(port, async () => {
  console.log("\x1b[36m%s\x1b[0m", "Connecting to MONGODB...");
  await prisma.$connect();
  console.log("\x1b[36m%s\x1b[0m", "Connecting to ELASTICSEARCH...");
  await elastic.ping({ pretty: true });
  console.log(
    "\x1b[33m%s\x1b[0m",
    `Server running on port http://localhost:${port}`
  );
});
