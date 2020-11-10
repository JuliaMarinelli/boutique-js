let productSelect = $("#productSelect")

$.get("http://localhost:5500/products")
    .then(function(response) {
        return response
    })
    .then(function(data){

        const categories = []
        const products = data

        products.forEach(product => {
            if(categories.indexOf(product.categorie) === -1){
                categories.push(product.categorie);
            }
        });
        
        categories.forEach(categorie =>{
            let optGroupCategorie = $("<optgroup></optgroup>").attr("label", categorie).attr("id", categorie.replaceAll(" ", "")).appendTo(productSelect);
        });

        products.forEach(product => {
            let optGroupCategorie = $("#"+product.categorie.replaceAll(" ", ""))
            let optProduct = $("<option></option>").attr("value", product.id).text(product.name).appendTo(optGroupCategorie);
        });

        productSelect.formSelect();
    })


let form = $('form');


$("#message-confirmation").hide()
$("#message-error").hide()

form.on("submit", function(e){
    e.preventDefault();
    
    let idToDel = {id : productSelect.val()};
    let isValid = idToDel !== "";

    console.log(idToDel)

    if(isValid){
        $.ajax({
            type:'DELETE',
            url : "http://localhost:5500/delProduct",
            data : JSON.stringify(idToDel),
            dataType : "JSON"
        })
        form.get(0).reset();
        $("#message-confirmation").show()
        $("#message-error").hide()
    } else {
        $("#message-confirmation").hide()
        $("#message-error").show()
    }
})