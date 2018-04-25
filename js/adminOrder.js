$(document).ready(function () {

        //ajax anrop p� f�retags ordrarna
        $.ajax({
            url: "https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=99",
            method: "GET",
            success: function (orders) {

                //Container $orders skapas med id f�r css
                var $orders = $('#orders');
                
                //Loopar orders
                for (var i = 0; i < orders.length; i++) {


                    //Skapar container orderData och best�mmer vad vi vill visa n�r vi printar senare, 
                    //lite text, v�rdet vi vill f� ut, sen radbryt och n�sta
                    var orderData = 'Id: ' + orders[i].id + '<br/>Created: ' + orders[i].created + '<br/>' + 'Mail: ' + orders[i].createdBy + '<br/>' + 'Payment Method: ' + orders[i].paymentMethod + '<br/>' + 'Total Price: ' + orders[i].totalPrice + '<br/>';


                    //Loopar produkter och l�gger in filmnamn
                    for (var j = 0; j < orders[i].orderRows.length; j++) {
                        $.ajax({
                            url: "https://medieinstitutet-wie-products.azurewebsites.net/api/products/" + orders[i].orderRows[j].productId,
                            method: "GET",
                            async: false,
                            success: function (product) {
                                //L�gger till orderData info med namn, l�gger ut text f�r antal, in med ordersi o rowsj antal f�r att f� ut r�tt antal 
                                //filmer med r�tt namn
                                orderData += product.name + ", Amount: " + orders[i].orderRows[j].amount + "<br/>";

                            }
                        });
                    }

                    //Printar order data per order via v�r fina orderData
                    //skapar en fin hr tag f�r att skapa en l�tt manipulerad border mellan ordrarna
                    $orders.append(orderData);
                    $orders.append(document.createElement("hr"));

                }


            }

        });

});