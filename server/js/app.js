const http = require('http');
const { handleGetRequest, handlePostRequest, handleDeleteRequest, handleUpdateRequest } = require('./middleware');
const {requestSupported} = require("./router");

const server = http.createServer(function(request, response){
    response.setHeader("Access-Control-Allow-Origin", "*")
    let method = request.headers['access-control-request-method']
    request.method = request.method && request.method == "OPTIONS" ? method : request.method;
    if(requestSupported(response, request.method)){
        if(request.method === "GET"){
            handleGetRequest(request, response);
        } else if (request.method === "POST") {
            handlePostRequest(request, response);
        } else if (request.method === "DELETE"){
            handleDeleteRequest(request, response);
        } else if (request.method === "UPDATE"){
            handleUpdateRequest(request, response);
        
        } else {
            handleGetRequest(response, statusCode, message);
        }
    }
})

server.listen(5500, function(){
    console.log('server started...')
})