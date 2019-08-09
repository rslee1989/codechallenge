const debug = require("debug");

// export as a const in this manner so we can import { logger }
const logger = debug("sabio:services");

const Common = { logger };

module.exports = Common;
