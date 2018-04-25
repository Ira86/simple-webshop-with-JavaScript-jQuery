$(function () {
    //skapar globala variablar att anv�nda runt om i scriptet
    var $orders = $('#orders');
    var $products = $('#products');
    var orderRowsOut = [];
    var sortingOrders;
    var sortingProducts = "";

    //h�mtar api order id 99
    $.ajax({
        type: 'GET',
        url: 'https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyid=99',
        success: function (orders) {
            $.each(orders, function (i, order) {
                //s�ger hur vi vill att saker ska printas
                sortingOrders = 'Created: ' + JSON.stringify(order.created) + '<br/>' + 'Mail: ' + JSON.stringify(order.createdBy) + '<br/>' + 'Payment Method: ' + JSON.stringify(order.paymentMethod) + '<br/>' + 'Total Price: ' + JSON.stringify(order.totalPrice);
                orderRowsOut = order.orderRows;



            });
            //Skapar en loop som l�gger till titlar med filmer p� order listan och printar ordrar
            for (var j = 0; j < orderRowsOut.length; j++) {

                $.ajax({
                    type: 'GET',
                    url: 'https://medieinstitutet-wie-products.azurewebsites.net/api/products',
                    success: function (products) {
                        $.each(products, function (k, product) {
                            //Om dom �r lika, s� kan vi f� ut namn p� film
                            if (JSON.stringify(product.productId) == JSON.stringify(orderRowsOut.productId)) {
                                //printar ut samtliga titlar
                                sortingProducts += '<br/>Title: ' + (product.name);
                                //tar bort fula "" i printen och appendar sortingOrders
                                $orders.append(sortingOrders.replace(/\"/g, ""));
                                //printar sortingProducts
                                $orders.append(sortingProducts);
                                //Skapar en border linje mellan printarna, trollar den �ven lite i css
                                $orders.append(document.createElement("hr"));

                            }

                        });
                    }
                });

            }

        }





    });





});
