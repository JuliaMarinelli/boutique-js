$(document).ready(function(){
    $('.datepicker').datepicker();
});

let form = $('form');

// SETUP CATEGORIE SELECT
$.get("http://localhost:5500/products")
    .then(function(response) {
        return response
    })
    .then(function(data){
        const products = data
        const categories = [];
        const categoriSelect = $("#categorieSelect");

        products.forEach(product => {
            if(categories.indexOf(product.categorie) === -1){
                categories.push(product.categorie);
                let categorieOpt = $("<option></option>").attr("value", product.categorie).text(product.categorie).appendTo(categoriSelect);
            }
        });

        categorieOpt = $("<option></option>").attr("value", "Autre").text("Autre").appendTo(categoriSelect);
    })

// GET PRODUCT DATA
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
        $("#product_name").val(product.name)
        $("#quantity").val(product.quantity)
        $("#img_url").val(product.img)
        $("#date").val(product.date)
        $("#livraison").prop("checked", product.livraison)
        $('#categorieSelect option[value="' + product.categorie + '"]').prop('selected', 'selected')
        $("#price").val(product.prix)
        $("#categorieSelect").formSelect();
    })
} 

$("#message-confirmation").hide()
$("#message-error").hide()

// SUBMIT UPDATE
form.on("submit", function(e){
    e.preventDefault();
    let product = {
        id : parseInt(searchParams.get('id')),
        name : $("#product_name").val(),
        quantity : $("#quantity").val(),
        img : $("#img_url").val(),
        date : $("#date").val(),
        livraison :$("#livraison").is(":checked"),
        categorie :$("#categorieSelect").val(),
        prix :$("#price").val()
    }
    
    let isValid = true;
    $.each(product, function(k,v){
        if(v === ""){
            alert(k + " is empty");
            isValid = false;
        }
        console.log(v)
    })

    if(isValid){
        console.log(JSON.stringify(product))
        $.ajax({
            type:"UPDATE",
            url : "http://localhost:5500/updateProduct&product=" + JSON.stringify(product)
        })
        $("#message-confirmation").show()
        $("#message-error").hide()
    } else {
        $("#message-confirmation").hide()
        $("#message-error").show()
    }
})