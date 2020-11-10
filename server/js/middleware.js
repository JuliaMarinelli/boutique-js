const product = require('./products');
const URL_HOME = "/"
const URL_PRODUCT = "/products"
const URL_ADD_PRODUCT = "/addProduct"
const URL_DEL_PRODUCT = "/removeProduct"
const { isExistGetPath, isExistPostPath, isExistDeletePath } = require("./router");

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

function handleDeleteRequest(req, res){
    res.statusCode = 202;
    if(isExistDeletePath(res, req.url)){
        if(req.url === URL_DEL_PRODUCT){
            req.on('data', function(data){
                product.removeProduct(parseInt(data))
            })
        }
    }
}



Middleware.prototype.handleGetRequest = handleGetRequest;
Middleware.prototype.handlePostRequest = handlePostRequest;
module.exports = new Middleware();
