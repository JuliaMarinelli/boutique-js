let searchParams = new URLSearchParams(window.location.search)
if(searchParams.has('id')){
    let id = parseInt(searchParams.get('id'))
    $.ajax({
        type:'POST',
        url : "http://localhost:5500/product",
        data : JSON.stringify(id),
        dataType : "JSON"
    }).then(function(response) {
        return response
    }).then(function (product){
        console.log(product)
        let productTitle = $("#productTitle");
        let productSubTitle = $("#productSubTitle");
        let productImg = $("#productImg");
        let divProductInfo = $("#productInfo");

        productTitle.text(product.name)
        productSubTitle.text("(" + product.categorie + ")")
        productImg.attr("src", product.img);

        let quantity = $("<p></p>").text('Quantité : '+ product.quantity).appendTo(divProductInfo)
        let date = $("<p></p>").text('Date : '+ product.date).appendTo(divProductInfo)
        let livraison = $("<p></p>").text(product.livraison ? "Livraison disponnible" : "Livraison indisponnible").appendTo(divProductInfo)
        let prix = $("<p></p>").text('Prix : '+ product.prix + "€").appendTo(divProductInfo)
    })

} 