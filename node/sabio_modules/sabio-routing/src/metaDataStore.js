const { routeDebugger, SCHEMAS, getDecorators } = require("./common");
const RouteData = require("./RouteData");
const chalk = require("chalk");

function extractRoutesFromMetaData(pathToControllers) {
  let routesToAdd = [];
  const controllers = [];

  require("require-all")({
    dirname: pathToControllers,
    filter: /(.+Controller)\.js$/,
    resolve: function(module) {
      if (module.controller) {
        // eslint-disable-next-line new-cap
        let instance = new module.controller();
        controllers.push(instance);
        return instance;
      }
    }
  });

  routeDebugger(`

Instantiated Controllers for Routing`);
  routeDebugger(controllers);
  routeDebugger(`
  ---------------------------------------`);

  for (const key in controllers) {
    if (controllers.hasOwnProperty(key)) {
      const controller = controllers[key];

      let thisPrototype = Object.getPrototypeOf(controller);

      /**
       * This will bring back an array of endpoints
       * that were configured for Anonymous access. They were added
       * enpointName === methodName.toLowerCase()
       */
      let anonByController = getDecorators(
        SCHEMAS.ROUTES.ANONYMOUS,
        thisPrototype
      );

      let rolesByController = getDecorators(
        SCHEMAS.ROUTES.ROLEAUTHORIZATION,
        thisPrototype
      );

      let methods = Object.getOwnPropertyNames(thisPrototype);

      let byInstancePrototype = getDecorators(
        SCHEMAS.ROUTES.PREFIX,
        thisPrototype
      );

      if (!byInstancePrototype) {
        routeDebugger(
          chalk.magentaBright(`
Skipping Controller because it is not configured: ${controller.controllerName}`)
        );
        continue;
      } else {
        routeDebugger(
          chalk.green.bold(`
Inspecting Routes for  ${controller.controllerName}`)
        );
      }

      for (const endPoint in methods) {
        const methodName = methods[endPoint];
        let anEndPoint = thisPrototype[methodName];

        if (methodName === "constructor") {
          // do something for the contstuctor
          continue;
        }

        let routeParams = getDecorators(SCHEMAS.ROUTES.ROUTE, anEndPoint);
        if (!routeParams) {
          routeDebugger(
            chalk.blue(
              `
Skipping Method in Controller because Controller is not configured: ` +
                chalk.blue.bold(`${methodName}`) +
                ` . Make sure the Controller has a RoutePrfix`
            )
          );
          continue;
        }

        if (!byInstancePrototype) {
          throw new Error(
            chalk.blue(`
Routing Configuration Error. There is no controller configured for ${endPoint} ${methodName}
`)
          );
        }

        let prefixData = byInstancePrototype;
        let thisEndpoint = routeParams;

        let route = thisEndpoint.routePath;
        let httpMethod = thisEndpoint.httpMethod;
        let httpPayload = thisEndpoint.requestModel;
        let allowAnonymous = false;
        let fullRoutePath = prefixData.prefix + "/" + route;
        let authRoles = null;

        // determin if we should allow anonymous access
        if (anonByController && anonByController.length > 0) {
          let hasAnonFlag = anonByController.filter(
            item => item.enpointName === methodName.toLowerCase()
          );

          if (hasAnonFlag && hasAnonFlag.length > 0) {
            allowAnonymous = true;
            routeDebugger(
              chalk.blue.underline.bold("AllowAnonymous Discovered ") +
                fullRoutePath
            );
          }
        }

        if (rolesByController && rolesByController.lenght > 0) {
          authRoles = rolesByController.find(
            item => item.enpointName === methodName.toLowerCase()
          );
        }
        if (httpPayload) {
          routeDebugger(
            chalk.whiteBright.bold("Request Schema Discovered ") + fullRoutePath
          );
        }

        const data = new RouteData(
          anEndPoint,
          fullRoutePath,
          httpMethod,
          httpPayload,
          allowAnonymous,
          authRoles,
          byInstancePrototype
        );
        routesToAdd.push(data);
      }
    }
  }

  return routesToAdd;
}

const MetaData = { extractRoutesFromMetaData };

module.exports = MetaData;
