$(function () {
"use strict";

// $("#sendToLocalstorageBtn").on("click", createNewContact);
// /*Skapa ny kontakt och validera det innan de sänds till localstorage och tacksida*/
//
//
//
// function createNewContact(){
//
// $(".saveAndSend").on("click", function() {
//
// function validateForm() {
//   var errormessage = "";
//   // sätter att allt är ok från början och ändrar till false när validerigen misslyckas.
//   var success = true;
//
//
//   var errorsFields = new Array();
//
// $('.errorFeedback errorSpan').hide();
//
// var nameReg = /^[A-Za-z]+$/;
// var numberReg = /^[0-9]+$/;
// var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
//
//
// // Check required fields have something in them
// if($("#contactName").val() == "") {
//   $("#contactName").after('<span class="errorFeedback errorSpan" id="nameError">Name is required</span>');
//     errorsFields.push("name");
//     success = false;
// }
//
// // Check required fields have something in them
// if($("#contactName").val() == "") {
// errorsFields.push("name");
// success = false;
// }
//
// //Basic e-mail check, just an @ symbol
// if($("#contactEmail").val() ==""){
// $("#contactEmail").after('<span class="errorFeedback errorSpan" id="emailErro">E-mail is required</span>');
// errorsFields.push("email");
// success = false;
// }
//
//
// if($("#contactPhone").val() != ""){
// $("#contactPhone").after('<span class="errorFeedback errorSpan" id="phoneError">Format: Only numbers pleace</span>');
// errorsFields.push("phone");
// success = false;
// }
//
// if($("#contactMessage").val() == "") {
// $("#contactMessage").after('<span class="errorFeedback errorSpan" id="messageError">Message is required</span>');
// errorsFields.push("message");
// success = false;
// }
//
// if (!success) {
// return errorsFields;
// // }
// } else {
// success;
// //skicka vidare till tack sidan!!!!!!!
//
// // return true;
// window.location.href = "thankyoupage.html";
//
// // },
// } //end function validateForm
//
// function provideFeedback (incomingErrors){
//   for (var i = 0; i < incomingErrors.length; i++) {
//     $("#" + incomingErrors[i]).addClass("errorClass");
//     $("#" + incomingErrors[i] + "Error").removeClass("errorFeedback");
//   }
//   $("#errorDiv").html("Error encountered");
//   }
//
// function removeFeedback() {
//   $("#errorDiv").html ("");
//   $('input').each(function() {
//     $(this).removeClass("errorClass");
//   });
//
//   $('.errorSpan').each(function() {
//     $(this).addClass("errorFeedback");
//   });
// }
//
//
//
//
//
//
//
//
// /*Det finns inga "classer" i JS. Det går att skapar en constructor function för att skapa nya object med egenskaper.
// Använs stor bokstav - som i JS inbyggda object som tex Data och Array. */
// function Contact(contactName, contactEmail, contactPhone, contactMessage) {
//   //properties med parametrar
//     this.ContactName = contactName;
//     this.ContactEmail = contactEmail;
//     this.ContactPhone = contactPhone;
//     this.ContactMessage = contactMessage;
// }
//
// //Hämtar upp lista från localstorage
// var contacts = JSON.parse(localStorage.getItem("contacts"));
//
// //Skapa variablar för Namn
// var contactName = document.getElementById("contactName").value;
//
// //Skapa variablar för Email
// var contactEmail = document.getElementById("contactEmail").value;
//
// //Skapa variablar för Telefon
// var contactPhone = document.getElementById("contactPhone").value;
//
// //Skapa variablar för Medelande
// var contactMessage = document.getElementById("contactMessage").value;
//
//
// //Här skapar vi en ny variabel från Contact constructorn från ovan
// var contact =  new Contact(contactName, contactEmail, contactPhone, contactMessage);
//
// // Skapa en variabel som innehåller en lista
// var contacts = [];
//
//   //Hämtar upp lista från localstorage
//   if (localStorage.getItem("contacts") != null) {
//   contacts = JSON.parse(localStorage.getItem("contacts"));
//   }
// //lägger den längst bak i listan
// contacts.push(contact);
//
// localStorage.setItem("contacts", JSON.stringify(contacts));
//
// }//Slut creataNewContact
//



$("#showListBtn").on("click", showList);

function showList()  {
  //Hämta om det finns innehåll i localstorage
  //Parse the data with JSON.parse(), and the data becomes a JavaScript object.
  if(localStorage.getItem("contacts") != null) {
  // Häntar lista med contacformulär från localstorage
  var contacts = JSON.parse(localStorage.getItem('contacts'));

  //skapar en variabel med en lista
  var wholeList = "<ul>";

    //Loopa igen listorna med nyaContactformulär per person
    for (var i = 0; i < contacts.length; i++) {

      var inner = "<ul>";//skapar en variabel med en lista
      inner += "<li>" + contacts[i].ContactName + "</li>";
      inner += "<li>" + contacts[i].ContactEmail + "</li>";
      inner += "<li>" + contacts[i].ContactPhone + "</li>";
      inner += "<li>" + contacts[i].ContactMessage + "</li>";

      inner += '<button id=' + contacts[i].ContactEmail + ' class="deleteContact">';
      inner += "Delete";
      inner += '</button>';

      inner += "<br>";
      inner += "<br>";
      inner += "</ul>";
      wholeList += inner;
      }
    }
    wholeList += "</ul>";
    //Skriver ut på adminsidan
    document.getElementById("items").innerHTML += wholeList;

$(".deleteContact").on("click", function(){
$(this).closest("ul").remove();
console.log(event.target);
console.log($(this));

//Hämtar contactlista från localstorage
var contacts = JSON.parse(localStorage.getItem('contacts'));

  for (var i = 0; i < contacts.length; i++){

    if (contacts[i].ContactEmail == $(this).attr('id')) {
    contacts.splice([i], 1);
    }
  }
localStorage.setItem('contacts', JSON.stringify(contacts));

});//Slut deleteMe
}//Slut Showlist


// $.getJSON("http://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=99", orders);

//function orders(data) {
//console.log(data);

//var list = "<ul>";
//for (var i = 0; i < data.length; i++) {
//var content = "<ul>";
//content += "<li class='orderRow'>" + data[i].created + "</li>";
//content += "<li class='orderRow'>" + data[i].createdBy + "</li>";
//content += "<li class='orderRow'>" + data[i].totalPrice; + "</li>";

//for (var j=0; j < data[i].orderRows.length; j++){
// content += "<ul>";
//content += "<li class='productRow'>" + data[i].orderRows[j].productId + "</li>";
//content += "<li class='productRow'>" + data[i].orderRows[j].amount + "</li>";
//content += "<li class='productRow'>" + data[i].orderRows[j].orderId + "</li>";
// content+= "</ul>";
// content+= "</li>"

//content += "<li class='orderRow'>" + "<input type='checkbox'>" + "</li>";

//content += "<br>";
//content += "<br>";
//content += "</ul>";

//list += content;
//}//slut product rows
//list += "</ul>";
//document.getElementById("orderItems").innerHTML += list;//skriver ut ordrarna på adminsidan
//}//slut order loop
//}//Slut ordersfunction

});//Slut ready funtion





//     var $orders = $('#orders');
//     var getName = "";
//     var stringifyName = "";
//     var parseName = "";
//
//     //hämtar api order id 99
//     $.ajax({
//         type: 'GET',
//         url: 'https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyid=99',
//         success: function (orders) {
//             $.each(orders, function (i, order) {
//     //skapar en var med replace för att få bort ärvda "" från api, sen listar och trycker ut det vi vill se
//                 var sorting = '<p>companyId: ' + JSON.stringify(order.companyId) + '<br/>' + 'created: ' + JSON.stringify(order.created) + '<br/>' + 'createdBy: ' + JSON.stringify(order.createdBy) + '<br/>' + 'paymentMethod: '
//                 + JSON.stringify(order.paymentMethod) + '<br/>' + 'totalPrice: ' + JSON.stringify(order.totalPrice) + '<br/>' + 'status: ' + JSON.stringify(order.status) + '<br/>' + 'orderRows: ' + JSON.stringify(order.orderRow) + '<br/>' + '</p> ';
//                 $orders.append(sorting.replace(/\"/g, ""));
//                 $orders.append(document.createElement("hr"));
//             });
//         }
//     });
//
// });



// "id": 43,
//    "companyId": 99,
//        "created": "2017-12-07T00:00:00",
//        "createdBy": "charba",
//        "paymentMethod": "paypal",
//        "totalPrice": 100,
//        "status": 1,
//        "orderRows": [
//        {
//        "id": 53,
//        "productId": 76,
//        "product": null,
//        "amount": 2,
//        "orderId": 43





                // getName = order.orderRows.product;
                // stringifyName = JSON.stringify(getName);
                //
                // parseName = JSON.stringify(order.orderRows.product);
                //
                // getName = JSON.stringify(order.orderRows);
                //
                // parseName = JSON.parse(getName).product;
                //
                // function convertName(name) {
                //
                //    console.log("Name: " + parseName);
                //
                //    $.ajax({
                //        type: 'GET',
                //        url: 'https://medieinstitutet-wie-products.azurewebsites.net/api/products',
                //        success: function (titles) {
                //            $.each(titles, function (i, title) {
                //                if (title.name == name) {
                //
                //                    return title.name;
                //                }
                //                else {
                //                    return "exkrement";
                //                }
                //            });
                //        }
                //    });
                //};//
