const { dataProvider: provider, TYPES } = require("../src");
const debug = require("debug");
const _logger = debug("tests:sabio:data:provider");
const chalk = require("chalk");

//procSelectMultipleOutPut();
//two();
//three();
//selectMultipleOutPut();
selectSingleOutPut();
function three() {
  let testName = "three";
  provider.executeNonQuery(
    "dbo.One_Insert",
    inputParamsOneInsert(testName),
    returnParameters(testName),
    onCallCompleted(testName, false)
  );

  function inputParamsOneInsert(testName) {
    return function(request) {
      request.input("name", TYPES.NVarChar(50), "A Name");
      request.output("Id", TYPES.Int);
    };
  }
}

function selectSingleOutPut() {
  let testName = "Test:executeCmd selectSingleOutPut";
  let completCallBack = onCallCompleted(testName, true);
  let goodLogger = goodLog(testName);

  provider.executeCmd(
    "[dbo].[Sabio_Addresses_SelectById]",
    mapInputParams(),
    singleRecordMapper(testName),
    infoLog(testName),
    completCallBack
  );

  function singleRecordMapper(testName) {
    return function(data, set) {
      _logger(
        chalk.yellow(`---------------------------------------------------------
-- New Single Record Below ${testName}
          `)
      );
      goodLogger({ set, data });
      _logger(
        chalk.blue(`
-- ---------------------------- --------------- --------------
`)
      );
    };
  }

  function mapInputParams() {
    return function(req) {
      req.input("Id", TYPES.Int, 500);
    };
  }

  // function inputParamsOneInsert(testName) {
  //   return function(request) {
  //     request.input("name", TYPES.NVarChar(50), "A Name");
  //     request.output("Id", TYPES.Int);
  //   };
  // }
}

function selectMultipleOutPut() {
  let testName = "Test:executeCmd selectMultiple OutPut";
  let completCallBack = onCallCompleted(testName, true);
  let goodLogger = goodLog(testName);

  provider.executeCmd(
    "[dbo].[Sabio_Addresses_SelectRandom50]",
    mapInputParams(),
    singleRecordMapper(testName),
    infoLog(testName),
    completCallBack
  );

  function singleRecordMapper(testName) {
    return function(data, set) {
      _logger(
        chalk.yellow(`---------------------------------------------------------
-- New Single Record Below ${testName}
          `)
      );
      goodLogger({ set, data });
      _logger(
        chalk.blue(`
-- ---------------------------- --------------- --------------
`)
      );
    };
  }

  function mapInputParams() {
    return function(req) {
      req.output("TestOutPut", TYPES.Int);
    };
  }

  // function inputParamsOneInsert(testName) {
  //   return function(request) {
  //     request.input("name", TYPES.NVarChar(50), "A Name");
  //     request.output("Id", TYPES.Int);
  //   };
  // }
}

function procSelectMultipleOutPut() {
  let testName = "procSelectMultipleOutPut";
  provider
    .executeProc(
      "[dbo].[Sabio_Addresses_SelectRandom50]",
      function(req) {
        req.output("TestOutPut", TYPES.Int);
      },
      infoLog(testName), //just log the output params
      null
    )
    .then(onSuccess(testName))
    .catch(function(err) {
      _logger(chalk.red("caught exception - Sabio_Addresses_SelectRandom50"));
      _logger(err);
    });
}

function two() {
  let testName = "two";
  provider
    .executeProc("dbo.One_Insert", function(request) {
      request.input("name", TYPES.NVarChar(50), "A Name");
      request.output("Id", TYPES.Int);
    })
    .then(onSuccess)
    .catch(onCallCompleted(testName, true));
}

function onSuccess(testName) {
  return function(data) {
    let msg = JSON.stringify(data, null, 2);
    _logger(`
TestName: ${chalk.underline.blue(testName)}
onSuccess: ${chalk.green(msg)}
`);
  };
}

function toString(data) {
  return JSON.stringify(data, null, 2);
}

function infoLog(testName) {
  return data => {
    let msg = JSON.stringify(data, null, 2);
    _logger(`
TestName: ${chalk.underline.blue(testName)}
data: ${chalk.blue(msg)}
`);
  };
}

function goodLog(testName) {
  return data => {
    let msg = JSON.stringify(data, null, 2);
    _logger(`
TestName: ${chalk.underline.blue(testName)}
data: ${chalk.blue(msg)}
`);
  };
}

function onCallCompleted(testName, logOk) {
  return function(err, response) {
    if (err) {
      _logger(chalk.red("on complete err with" + testName));
      _logger(chalk.red(toString(err)));
    } else {
      _logger(chalk.green("on complete OK:" + testName));
    }
    if (logOk) {
      _logger(chalk.green(toString(response)));
    }
  };
}

function returnParameters() {
  return function(returnParams) {
    _logger(chalk.blue("returnParams"));
    _logger(toString(returnParams));
  };
}
