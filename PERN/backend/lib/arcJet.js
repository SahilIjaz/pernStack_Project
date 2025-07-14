import arcjetLib, { tokenBucket, shield, detectBot } from "@arcjet/node"; // 👈 renamed imported function

import dotenv from "dotenv";
dotenv.config();

export const arcjet = arcjetLib({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 10,
      interval: 10,
      capacity: 5,
    }),
  ],
});
