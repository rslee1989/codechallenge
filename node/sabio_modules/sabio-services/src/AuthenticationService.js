const jwt = require("jsonwebtoken");
const { logger } = require("./common");
const _debug = logger.extend("authentication");

const SABIO_JWT_KEY = Buffer.from("e02ad8a626b84d298fa1a0d4e5df8bce", "utf-8");
const COOKIENAME = "authentication";
const CLAIMS = {
  ID: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
  USERNAME: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
  ROLES: "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
  TENANTID: "Sabio.TenantId"
};

class AuthenticationService {
  /**
   * @summary Will athenticate user by placing cookie in response
   * @param {*} res
   * @param {UserLoginRequest} userRequest
   */
  authenticate(res, userRequest) {
    var today = new Date();
    var duration = 90; // In Days
    today.setTime(today.getTime() + duration * 24 * 60 * 60 * 1000);
    let cookieOpts = {
      maxAge: 900000,
      httpOnly: false,
      expires: today
    };

    res.cookie(COOKIENAME, tokenizeAndSign(userRequest), cookieOpts);
  }

  logOut(res) {
    var yesterday = new Date();
    var duration = -1; // In Days
    yesterday.setTime(yesterday.getTime() + duration * 24 * 60 * 60 * 1000);
    let cookieOpts = {
      maxAge: -1,
      httpOnly: false,
      expires: yesterday
    };

    res.cookie(COOKIENAME, "", cookieOpts);
    res.clearCookie(COOKIENAME);
  }

  getCurrentUser(req) {
    let currentUser = null;
    try {
      const authCookie = req.cookies.authentication;
      if (authCookie) {
        currentUser = decodeToken(authCookie);
        req.user = currentUser;
      }
    } catch (e) {
      req.user = null;
    }

    return currentUser;
  }
}

const CLAIMS_TWO = {
  ID: "nameid",
  USERNAME: "unique_name",
  ROLES: "role",
  TENANTID: "Sabio.TenantId"
};

function tokenizeAndSign({ userId, userName, roles, tenantId }) {
  let user = {
    // iss: "localhost",
    // aud: "localhost"
  };
  user[CLAIMS_TWO.USERNAME] = userName;
  user[CLAIMS_TWO.ID] = userId;

  user[CLAIMS_TWO.ROLES] = roles || [];

  if (tenantId) {
    user[CLAIMS_TWO.TENANTID] = tenantId || null;
  }

  let token = jwt.sign(user, SABIO_JWT_KEY, getJWTOptions());

  return token;
}

function decodeToken(authCookie) {
  _debug("decodint token");
  const payload = jwt.verify(authCookie, SABIO_JWT_KEY);

  return extractUserFromToken(payload);
}

function extractUserFromToken(payload) {
  let user = {
    id: payload[CLAIMS_TWO.ID],
    name: payload[CLAIMS_TWO.USERNAME],
    roles: payload[CLAIMS_TWO.ROLES] || []
  };

  if (payload[CLAIMS_TWO.TENANTID]) {
    user.tenantId = payload[CLAIMS.TENANTID];
  }

  return user;
}

function getJWTOptions() {
  let options = {
    issuer: "localhost",
    audience: "localhost",
    expiresIn: "90 days"
  };
  return options;
}

module.exports = new AuthenticationService();
