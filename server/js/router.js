const requestSupportedMethod = ["GET", "POST", "DELETE", "UPDATE"];
const routerPathGet = ["/products"];
const routerPathPost = ["/addProduct", "/product"];
const routerPathDelete = [new RegExp("\/removeProduct&id=[0-9]")]
const routerPathUpdate = [new RegExp("\/updateProduct&product=")]


const { handleErrorRequest } = require("./middleError");

class Router {
     constructor(){
    //     this.routerPathGet = [];
    //     this.routerPathPost = [];
    //     this.routerPathDelete = [];
    //     this.routerPathUpdate = [];
    }

    isExistGetPath(res, url){
        if(routerPathGet.indexOf(url) !== -1){
            return true;
        }
        else{
            handleErrorRequest(res, 404, `${url} doesn't exist in your GET router`);
        }
    }

    isExistPostPath(res, url){
        if(routerPathPost.indexOf(url) !== -1){
            return true;
        }
        else{
            handleErrorRequest(res, 404, `${url} doesn't exist in your POST router`);
        }
    }

    isExistDeletePath(res, url){
        for(let e in routerPathDelete){
            if(routerPathDelete[e].test(url)){
                return true
            }
        }
        handleErrorRequest(res, 404, `${url} doesn't exist in your DELETE router`);
    }

    isExistUpdatePath(res, url){
        for(let e in routerPathUpdate){
            if(routerPathUpdate[e].test(url)){
                return true
            }
        }
        handleErrorRequest(res, 404, `${url} doesn't exist in your UPDATE router`);
    }

    requestSupported(res, method){
        if(requestSupportedMethod.indexOf(method) !== -1){
            return true;
        }
        handleErrorRequest(res, 501, `${method} isn't yet supported by the server`);
    }
}

module.exports = new Router();