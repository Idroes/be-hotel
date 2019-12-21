import bunyan from "bunyan";

export const log = bunyan.createLogger({
  name: "hotel_db",
  streams: [
    {
      level: "info",
      stream: process.stdout
    },
    {
      level: "error",
      path: "./log/myapp-error.log"
    }
  ],
  level: "info"
});
