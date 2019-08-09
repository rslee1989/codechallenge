const Responses = require("sabio-web-models").Responses;
const BaseController = require("./BaseController");
const { logger } = require("./common");

const _debug = logger.extend("entities");

class EntitiesController extends BaseController {
  constructor() {
    super("EntitiesController");
  }
  addItem(req, res, next) {
    let sResponse = new Responses.ItemResponse(99);

    res.status("201").json(sResponse);
  }

  update(req, res, next) {
    let sResponse = new Responses.SuccessResponse("widgets");

    res.status("200").json(sResponse);
  }

  entity(req, res, next) {
    let sResponse = new Responses.ItemsResponse(["entities"]);
    _debug("GET entity.......");
    res.status("200").json(sResponse);
  }

  cars(req, res, next) {
    let sResponse = new Responses.ItemResponse("cars");

    res.status("200").json(sResponse);
  }

  search(req, res, next) {
    let sResponse = new Responses.ItemResponse("win");

    res.status("200").json(sResponse);
  }
}

module.exports = { controller: EntitiesController };
