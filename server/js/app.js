const http = require('http');
const { handleGetRequest, handlePostRequest } = require('./middleware');
const {requestSupported} = require("./router");

const server = http.createServer(function(request, response){
    response.setHeader("Access-Control-Allow-Origin", "*")
     if(requestSupported(response, request.method)){
         if(request.method === "GET"){
            handleGetRequest(request, response);
         } else if (request.method === "POST") {
            handlePostRequest(request, response);
            
     } else if (request.method === "DELETE"){
            
         } else if (request.method === "UPDATE"){
            
         } else {
             handleGetRequest(response, statusCode, message);
         }
     }
})

server.listen(5500, function(){
    console.log('server started...')
})