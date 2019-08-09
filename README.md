
# Developer Requirements

- yarn [install site](https://yarnpkg.com/lang/en/docs/install/#windows-stable) or
- yarn install with Powershell (Run as Administrator) script in this root folder: install-yarn.ps1

# first-build.ps1

Once the developer requirments have been satisfied you can run this script to do a few 1-time installs. Be sure to run the script as an Administrator.

# build-all.ps1

## React
- will `yarn install`
- verify you have a .env.development file
- will `yarn build`

- *will not run site*

## Node
- will `npm instal`
- will babel and other scripts to make sure site can run

## dotnet
- will enure you have a web.config 
- will build the main .sln file which causes all projects in dotnet can build

# run-dev-sites.ps1

This script will start up all your enviroments.

This script will detect your node and .net Api applications and attempt to start them them.

This script will not run any installs on node or react.

The dotnet application will automatically run a restore operation.

- The React site will spawn your browser to configured web site
- The Node app will also spin up a websever that you can ping at: http://localhost:8080/api/ping
- The dotnet app will also spin up a websever that you can ping at: https://localhost:50001/api/ping


# build-run-all.ps1

This script will `build-all.ps1` and `run-dev-sites.ps1`








