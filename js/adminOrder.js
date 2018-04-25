$(document).ready(function () {

        //ajax anrop på företags ordrarna
        $.ajax({
            url: "https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=99",
            method: "GET",
            success: function (orders) {

                //Container $orders skapas med id för css
                var $orders = $('#orders');
                
                //Loopar orders
                for (var i = 0; i < orders.length; i++) {


                    //Skapar container orderData och bestämmer vad vi vill visa när vi printar senare, 
                    //lite text, värdet vi vill få ut, sen radbryt och nästa
                    var orderData = 'Id: ' + orders[i].id + '<br/>Created: ' + orders[i].created + '<br/>' + 'Mail: ' + orders[i].createdBy + '<br/>' + 'Payment Method: ' + orders[i].paymentMethod + '<br/>' + 'Total Price: ' + orders[i].totalPrice + '<br/>';


                    //Loopar produkter och lägger in filmnamn
                    for (var j = 0; j < orders[i].orderRows.length; j++) {
                        $.ajax({
                            url: "https://medieinstitutet-wie-products.azurewebsites.net/api/products/" + orders[i].orderRows[j].productId,
                            method: "GET",
                            async: false,
                            success: function (product) {
                                //Lägger till orderData info med namn, lägger ut text för antal, in med ordersi o rowsj antal för att få ut rätt antal 
                                //filmer med rätt namn
                                orderData += product.name + ", Amount: " + orders[i].orderRows[j].amount + "<br/>";

                            }
                        });
                    }

                    //Printar order data per order via vår fina orderData
                    //skapar en fin hr tag för att skapa en lätt manipulerad border mellan ordrarna
                    $orders.append(orderData);
                    $orders.append(document.createElement("hr"));

                }


            }

        });

});