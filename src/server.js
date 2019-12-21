import express from "express";
import AppMiddleware from "./middlewares/app-middleware";
import AppRouter from "./routes";
import { logErrorEvent } from "./events/logging.event";
import http from "http";

const app = express();
app.use(AppMiddleware);
app.use(AppRouter);
export const server = http.createServer(app);
server.on("error", function(e) {
  logErrorEvent.emit("APP", { info: e });
  process.exit(1);
});
