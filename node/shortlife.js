/* eslint-disable no-global-assign */
const expressApp = require("./.compiled/server.js");

console.log(process.pid);

process.on("SIGTERM", () => {
  console.info("SIGTERM signal received.");
  console.log("Closing http server.");
  expressApp._server.close(() => {
    console.log("Http server closed.");
    process.exit(0);
  });
});

setTimeout(() => {
  //console.warn("closing....");
  expressApp._server.close(() => {
    console.log("Http server closed.");
    process.exit(0);
  });
  //expressApp._server.close();
}, 1500);

module.exports = expressApp;
