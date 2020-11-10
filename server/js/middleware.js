const product = require('./products');
const URL_HOME = "/"
const URL_PRODUCTS = "/products"
const URL_PRODUCT = "/product"
const URL_ADD_PRODUCT = "/addProduct"
const URL_DEL_PRODUCT = new RegExp("\/removeProduct&id=[0-9]")
const URL_UPDATE_PRODUCT = new RegExp("\/updateProduct&product=")
const { isExistGetPath, isExistPostPath, isExistDeletePath, isExistUpdatePath } = require("./router");

const { handleErrorRequest } = require("./middleError");
const products = require('./products');

function Middleware(){

}

function handleGetRequest(req, res){
    res.setHeader("Content-Type", 'application/json; charset=utf-8');
    res.statusCode = 200;
    if(isExistGetPath(res, req.url)){
        if(req.url === URL_PRODUCTS){
            res.end(JSON.stringify(product.getProducts))
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
        } else if (req.url === URL_PRODUCT){
            req.on('data', function(data){
                res.end(JSON.stringify(product.getProduct(parseInt(data.toString()))))
            })
        } 
    }
}

function handleDeleteRequest(req, res){
    res.statusCode = 202;
    if(isExistDeletePath(res, req.url)){
        if(URL_DEL_PRODUCT.test(req.url)){
            let id = req.url.match(new RegExp("\[0-9]+"))[0];
            console.log(id)
            product.deleteProduct(parseInt(id))
        }
    }
}

function handleUpdateRequest(req, res){
    res.statusCode = 202;
    if(isExistUpdatePath(res, req.url)){
        if(URL_UPDATE_PRODUCT.test(req.url)){
            let url = req.url.split(URL_UPDATE_PRODUCT);
            let productToUpdate = JSON.parse(decodeURI(url[1]))
            product.updateProduct(productToUpdate)
        }
    }
}



Middleware.prototype.handleGetRequest = handleGetRequest;
Middleware.prototype.handlePostRequest = handlePostRequest;
Middleware.prototype.handleDeleteRequest = handleDeleteRequest;
Middleware.prototype.handleUpdateRequest = handleUpdateRequest;
module.exports = new Middleware();
