$(document).ready(function(){
    $('.datepicker').datepicker();
    $('select').formSelect();
});

let form = $('form');


$("#message-confirmation").hide()
$("#message-error").hide()

form.on("submit", function(e){
    e.preventDefault();
    let product = {
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
        $.ajax({
            type:"POST",
            url : "http://localhost:5500/addProduct",
            data : JSON.stringify(product),
            dataType : "json"
        })
        form.get(0).reset();
        $("#message-confirmation").show()
        $("#message-error").hide()
    } else {
        $("#message-confirmation").hide()
        $("#message-error").show()
    }
})