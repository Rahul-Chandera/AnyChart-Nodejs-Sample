# AnyChart-Nodejs-Sample
In this sample, I have demonstrate how to create different kind of charts using AnyChart library. I have used "exportTo()" function of anychart-nodejs to export created charts as pdf file. You can also export as png or jpeg. 
Use "saveToFolder()" function if you want to store pdf file into your local directory, or use "saveToS3()" function to store file into your S3 bucket.
I have used "index.js" file just to execute this code into local machine.

Dependancies:
- anychart
- anychart-nodejs
- aws-sdk
- pg

How to run this sample in your local machine:
- 
- In your terminal, use "cd" command to set this project folder as your current directory
- Execute "npm install" command to install all dependancies (This will generate "node_modules" folder)
- Execute "node index.js" (This will execute the sample code, and will save pdf file into your specified folder)

Reference:
-
https://www.npmjs.com/package/anychart-nodejs
https://docs.anychart.com/Quick_Start/Quick_Start

