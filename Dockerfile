# Base the image on the built-in Azure Functions Linux image.
#FROM microsoft/azure-functions-runtime:2.0.0-jessie
FROM mcr.microsoft.com/azure-functions/node:2.0
ENV AzureWebJobsScriptRoot=/home/site/wwwroot

# Add files from this repo to the root site folder.
COPY wwwroot /home/site/wwwroot 

# Add dependancies for canvas (https://github.com/Automattic/node-canvas#installation)
RUN apt-get -y install libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++

# Restore NPM packages
WORKDIR /home/site/wwwroot/GraphToPng
RUN npm install
