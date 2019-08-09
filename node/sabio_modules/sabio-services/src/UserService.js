const authenticationService = require("./AuthenticationService");
const { logger } = require("./common");

const _debug = logger.extend("user");

class UserService {
  logIn(res, userRequest) {
    _debug("login called");

    return new Promise(resolve => {
      authenticationService.authenticate(res, userRequest);
      resolve();
    });
  }

  logOut(res, userRequest) {
    return new Promise(resolve => {
      authenticationService.logOut(res);
      resolve();
    });
  }

  getCurrentUser(req) {
    return new Promise(resolve => {
      let currentUser = authenticationService.getCurrentUser(req);
      resolve(currentUser);
    });
  }
}

const userService = new UserService();

module.exports = userService;
