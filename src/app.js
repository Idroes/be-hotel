import configure from "./config";
import createDbConnection from "./database/connection";
import { logErrorEvent } from "./events/logging.event";
import { server } from "./server";

createDbConnection(configure)
  .then(connection => {
    if (connection.isConnected) {
      configure();
      server.listen(process.env.APP_PORT);
    }
  })
  .catch(error => {
    logErrorEvent.emit("DB", { info: error });
  });
