var productModal = $("#productModal");
 
// Click "Add New Product"
var visibilityButton = document.querySelector(".modal");
    $(document).on("click", ".add_new", function(){
        visibilityButton.style.visibility = "visible";
    });

//Click "Close" in "Add New Product"
var closeButton = document.querySelector(".modal");
    $(document).on("click", ".close-button", function(){
        visibilityButton.style.visibility = "hidden";
    });

var modal = document.querySelector(".modal");
    $(function () {
        //JSON data by API call
        $.get(productListApiUrl, function (response) {
            if(response) {
                var table = '';
                $.each(response, function(index, product) {
                    table += '<tr data-id="'+ product.product_id +'" data-name="'+ product.name +'" data-unit="'+ product.uom_id +'" data-price="'+ product.price_per_unit +'">' +
                        '<td>'+ product.name +'</td>'+
                        '<td>'+ product.uom_name +'</td>'+
                        '<td>'+ product.price_per_unit +'</td>'+
                        '<td><span class="action">Delete</span></td></tr>';
                });
                $("table").find('tbody').empty().html(table);
                console.log(response)
            }
        });
    });
    //get uom
        //show method
    
    $("#unit-form").on("click",function(){
        $.get(uomListApiUrl, function (response){
            if (response){
                var options = '<option value="">--Select--</option>';
                $.each(response, function(index, uom){
                    options += '<option value="'+ uom.uom_id + '">'+ uom.uom_name + '</option>';
                });
                console.log(response)
                $("#unit-form").find("select").empty().html(options);
            }
        });
            
    });
    //delete
    $(document).on("click", ".action", function(){
        var tr = $(this).closest('tr');
        var data = {
            product_id : tr.data('id')
        };
        var isDelete = confirm("Are you sure to delete " + tr.data('name') + " item?");
        if (isDelete){
            callApi("POST", productDeleteApiUrl, data);
        }
    });
    


        //hide method
    productModal.on('hide.bs.modal', function(){
        $("#id").val('0')
        $("#name, #unit, #price").val('');
        productModal.find('.modal-title').text('Add New Product')
    });

        // Save Product
    $("#save-button").on("click", function () {
        // If we found id value in form then update product detail
        var data = $("#productForm").serializeArray();
        var requestPayload = {
            product_name: null,
            uom_id: null,
            price_per_unit: null
        };
        for (var i=0;i<data.length;++i) {
            var element = data[i];
            switch(element.name) {
                case 'name':
                    requestPayload.product_name = element.value;
                    break;
                case 'uoms':
                    requestPayload.uom_id = element.value;
                    break;
                case 'price':
                    requestPayload.price_per_unit = element.value;
                    break;
            }
        }
        callApi("POST", productSaveApiUrl, {
            'data': JSON.stringify(requestPayload)
        });
    });
