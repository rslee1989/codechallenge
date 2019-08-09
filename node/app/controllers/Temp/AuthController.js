const Responses = require("sabio-web-models").Responses;
const BaseController = require("../BaseController");
const userService = require("sabio-services").userService;
const { logger } = require("../common");
const { Temp } = require("sabio-models").Schemas;
const { AllowAnonymous, RoutePrefix, Route } = require("sabio-routing");

const _debug = logger.extend("auth");
const LogInSchema = Temp.LogInSchema;

@RoutePrefix("/api/temp/auth")
class AuthController extends BaseController {
  constructor() {
    super("AuthController");
  }

  @AllowAnonymous()
  @Route("GET", "login/:id(\\d+)/:userName/:role")
  logInGet(req, res, next) {
    let user = {
      userId: req.params.id,
      userName: req.params.userName + "@dispostable.com",
      roles: [req.params.role, "User", "Super", "Content Manager"],
      tenantId: "Acme Node Corp UId"
    };
    userService
      .logIn(res, user)
      .then(() => {
        _debug("User Athenticated");
        let sResponse = new Responses.SuccessResponse();
        res.status("200").json(sResponse);
      })
      .catch(e => {
        res.status("500").json(new Responses.ErrorResponse(e));
      });
  }

  @AllowAnonymous()
  @Route("POST", "login", LogInSchema)
  logInByBody(req, res, next) {
    let user = {
      userId: req.body.id,
      userName: req.body.userName,
      roles: [req.body.roles]
    };
    userService
      .logIn(res, user)
      .then(() => {
        _debug("User Athenticated");
        let sResponse = new Responses.SuccessResponse();
        res.status("200").json(sResponse);
      })
      .catch(e => {
        res.status("500").json(new Responses.ErrorResponse(e));
      });
  }

  @Route("GET", "logout")
  logout(req, res, next) {
    userService
      .logOut(res)
      .then(() => {
        let sResponse = new Responses.SuccessResponse();
        res.status("200").json(sResponse);
      })
      .catch(e => {
        res.status("500").json(new Responses.ErrorResponse(e));
      });
  }

  @Route("GET", "current")
  getCurrentUser(req, res, next) {
    let sResponse = new Responses.ItemResponse(req.user);
    res.status("200").json(sResponse);
  }

  @Route("POST", "current")
  getCurrentUserPost(req, res, next) {
    // for post request
    let sResponse = new Responses.ItemResponse(req.user);
    res.status("200").json(sResponse);
  }
}

module.exports = { controller: AuthController };
