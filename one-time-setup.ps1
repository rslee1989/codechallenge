#Requires -RunAsAdministrator
clear
$scriptpath = $MyInvocation.MyCommand.Path
$dir = Split-Path $scriptpath
$nodePath = $dir + "\node";
$reactPath = $dir + "\react";
$dotnetPath = $dir + "\dotnet";

cd $dir


Write-Host "Running this script may have unintended consequences." -ForegroundColor Green
$ShouldContinue = Read-Host -Prompt 'Continue? (y) or (n)' 

if($ShouldContinue -ne "y" )
{
    Write-Host "Exiting...." -ForegroundColor Yellow
    exit;
}

Write-host "Running Script out of $dir"


#----------------------------------
# React

if (Test-Path $reactPath) {
    
    #----------------------------------
    # No one time installs for react
}

#----------------------------------
# Node

if (Test-Path $nodePath) {

	Write-Host "Installing the latest typescript packages ..."
	npm install -g typescript@latest
	
    Write-Host "Installing select peer dependencies packages for node project ..."
    Write-Host "( You may get WARN messages. Those are OK. Look for Errors to determine if there is an issue )"
    cd .\node
    npm install babel-eslint -D --loglevel=error
    
    cd ..\
}
#----------------------------------
# dotnet


if (Test-Path $dotnetPath) {

    #----------------------------------
    # No one time installs for dotnet

}


