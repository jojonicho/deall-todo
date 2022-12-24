import "reflect-metadata";
import express from "express";
import cookieParser from "cookie-parser";

import { createServer } from "http";
import { BACKEND_URL, PORT } from "./constants";
import { appDataSource } from "./datasource";

import { messageRouter } from "./router/messageRouter";
import { authRouter } from "./router/authRouter";

(async () => {
  const app = express();
  app.use(express.json());
  app.use(cookieParser() as any);
  app.set("trust proxy", 1);

  appDataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization:", err);
    });

  // register routers
  app.use("/", authRouter);
  app.use("/message", messageRouter);

  const httpServer = createServer(app);

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at ${BACKEND_URL}:${PORT}`);
  });
})();
