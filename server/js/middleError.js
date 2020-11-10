const http = require("http");

function MiddlewareError(){}

function handleErrorRequest(res, statusCode, message){
    res.statusCode = statusCode;
    res.end(JSON.stringify({error: http.STATUS_CODES[statusCode], message: message}));
}

MiddlewareError.prototype.handleErrorRequest = handleErrorRequest;

module.exports = new MiddlewareError();