const Responses = require("sabio-web-models").Responses;
const { logger } = require("./common");
const chalk = require("chalk");

let _debug = logger.extend("validate.body");

module.exports = function validateBody(schema, options) {
  options = options || {};
  // model is a known schema

  return (req, res, next) => {
    const result = schema.validate(req.body, options || {});

    if (!result.error) {
      _debug(chalk.green("body is valid"));
      req.model = result.value;
      next();
      return;
    }

    _debug(chalk.bold.red("body validation errors"));

    let errors = [];
    errors.push(`Summary: ${result.error.message}`);

    errors = errors.concat(
      result.error.details.map(d => `${d.message} : ${d.type}`)
    );

    res.status(400).json(new Responses.ErrorResponse(errors));
  };
};
