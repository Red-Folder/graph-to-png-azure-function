# Base the image on the built-in Azure Functions Linux image.
#FROM microsoft/azure-functions-runtime:2.0.0-jessie
FROM mcr.microsoft.com/azure-functions/node:2.0
ENV AzureWebJobsScriptRoot=/home/site/wwwroot

# Add files from this repo to the root site folder.
COPY wwwroot /home/site/wwwroot 
