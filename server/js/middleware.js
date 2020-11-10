const product = require('./products');
const URL_HOME = "/"
const URL_PRODUCT = "/products"
const URL_ADD_PRODUCT = "/addProduct"
const { isExistGetPath, isExistPostPath } = require("./router");

const { handleErrorRequest } = require("./middleError");

function Middleware(){

}

function handleGetRequest(req, res){
    res.setHeader("Content-Type", 'application/json; charset=utf-8');
    res.statusCode = 200;
    if(isExistGetPath(res, req.url)){
        if(req.url === URL_PRODUCT){
            res.end(JSON.stringify(product.getProduct))
        } else if(req.url === URL_HOME){
            res.end('Hello World!');
        }
    }
}

function handlePostRequest(req, res){
    res.statusCode = 201;
    if(isExistPostPath(res, req.url)){
        if(req.url === URL_ADD_PRODUCT){
            req.on('data', function(data){
                product.saveProduct(JSON.parse(data))
            })
        }
    }
}



Middleware.prototype.handleGetRequest = handleGetRequest;
Middleware.prototype.handlePostRequest = handlePostRequest;
module.exports = new Middleware();
