import events from "events";
import { log } from "../logger";

export const logErrorEvent = new events.EventEmitter();

logErrorEvent.on("APP", function(err) {
  log.error({ transType: "APP_FAILED" }, err);
});

logErrorEvent.on("DB", function(err) {
  log.error({ transType: "DB_FAILED" }, err);
});

logErrorEvent.on("ROUTE", function(err, res) {
  log.error({ transType: "ROUTE_FAILED" }, err);
  res.status(404).json({ message: "Not Found" });
});

logErrorEvent.on("SESSION", function(res) {
  res.sendStatus(401);
});

logErrorEvent.on("CONTROLLER", function(err, res) {
  log.error({ transType: "CONTROLLER_FAILED" }, err);
  res
    .status(200)
    .json({ message: "We are sorry, your request can not be processed" });
});

logErrorEvent.on("CONTROLLER_LOGIN", function(err, res) {
  log.error({ transType: "CONTROLLER_FAILED" }, err);
  res.status(401).json({ message: "Account not found" });
});

logErrorEvent.on("CONTROLLER_UPDATE_PROFILE", function(err, res) {
  log.error({ transType: "CONTROLLER_FAILED" }, err);
  res
    .status(500)
    .json({ message: "We are sorry, your request can not be processed" });
});

logErrorEvent.on("CONTROLLER_GET_PROFILES", function(err, res) {
  log.error({ transType: "CONTROLLER_FAILED" }, err);
  res.status(401).json({ message: "Photo profile not found" });
});

logErrorEvent.on("CONTROLLER_REGIS", function(err, res) {
  log.error({ transType: "CONTROLLER_FAILED" }, err);
  res.status(401).json({ message: "Registration Failed" });
});

export const logInfoEvent = new events.EventEmitter();

logInfoEvent.on("ACCESS", function(info) {
  log.info({ transType: "USER-ROUTE" }, info);
});
