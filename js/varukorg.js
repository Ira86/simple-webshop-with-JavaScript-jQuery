// function för att validera Email, retunerar true om det lyckas i alla andra fall false
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// function för att validera mobilnummret, det får max vara 10 siffror och inga bokstäver.
// retunerar true om det lyckas i alla andra fall false
function validateNumber(number) {
  var re = /^\d{10}$/;
  if (!re.test(number)) {
    return false;
  }

  var re2 = /^\d+$/;
  if (!re2.test(number)) {
    return false;
  }

  return true;

}

function getDateTime() {
  var dateTime = new Date();
  dateTime.setHours(dateTime.getHours() + 1);
  return dateTime;
}




$(document).ready(function() {





  var lista = "<div class=\"main\">";

  var order = JSON.parse(localStorage.getItem('order'));
  var totalCount = 0;
  var total = "<div>";

  for (var i = 0; i < order.length; i++) {


    lista += "<div class=\"order\">";

    lista += "<div class=\"info\">";
    lista += "<img src=\"" + order[i].image + "\"  >";


    lista += "<div class=\"namn\">";
    lista += "Namn:" + order[i].name;

    lista += "<div class=\"pris\">";
    lista += "price:" + order[i].price;
    lista += "</div>";
    lista += "</div>";
    lista += "</div>";
    lista += "<div class=\"right\">";
    lista += "<div class=\"delete\">";
    lista += "<button class=\" btn btn-default \">";
    lista += "<span class=\"glyphicon glyphicon-trash\">";
    lista += "</button>";
    lista += "</div>";
    lista += "<div class=\"antal\">";
    lista += "<button  class=\"less btn btn-default\" movieId='" + order[i].Id + "'>";
    lista += "<span class=\"glyphicon glyphicon-minus\">";
    lista += "</button>";
    lista += "<input disabled min=\"1\" class=\"numb \" type='text' value=\"" + order[i].count + "\" >";
    lista += "<button class=\"add btn btn-default\" movieId='" + order[i].Id + "'>";
    lista += "<span class=\"glyphicon glyphicon-plus\">";
    lista += "</button>";
    lista += "</button>";
    lista += "</div>";

    lista += "</div>";
    lista += "</div>";







  }
  lista += "</div>";


  document.getElementById("container").innerHTML += lista;
// uppdaterar varukorgens totalpris
  function auto() {
    var listOfTotal = [];
    for (var j = 0; j < order.length; j++) {



      total = order[j].count * order[j].price;
      listOfTotal.push(total);


      //  total += "total" + order[i].count * order[i].price;


      console.log(listOfTotal);

    }

    var totalSum = listOfTotal.reduce(function(a, b) {
      return a + b;
    }, 0);

    var totalSum2 = totalSum;
    totalSum = "Total Price: " + totalSum + ":-";



    document.getElementById("totalPrice").innerHTML = totalSum;
    console.log(totalSum2);
    return totalSum2;
  }

// uppdatera varans count
  $(".add").on("click", function(event) {
    var currentMovieId = $(this).attr("movieId");
    for (var k = 0; k < order.length; k++) {
      var orderItemList = [];
      if (order[k].Id == currentMovieId) {

        order[k].count++;

        var buttonContainer = $(this).parent();
        $("input[type='text']", buttonContainer).val(order[k].count);

        break;
      }
    }
    auto();
    localStorage.setItem("order", JSON.stringify(order));
    getAmountOfItems();
  });
// uppdatera varans count
  $(".less").on("click", function(event) {
    var currentMovieId = $(this).attr("movieId");
    for (var k = 0; k < order.length; k++) {
      var orderItemList = [];
      if (order[k].Id == currentMovieId) {


        order[k].count--;

        if (order[k].count <= 1) {
            order[k].count = 1;
            }

        var buttonContainer = $(this).parent();
        $("input[type='text']", buttonContainer).val(order[k].count);

        break;
      }
    }
    auto();
    localStorage.setItem("order", JSON.stringify(order));
    getAmountOfItems();
  });
  // tar bort specific vara
  $(".delete").on("click", function() {
    console.log("test");
    var id = $(this).Id;

    $(this).parents(".order").remove();



    var order = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : [];
    var index;
    for (var i = 0; i < order.length; i++) {
      if (order[i].id === id) {
        index = i;
        break;
      }

    }


    if (index === undefined) return;
    order.splice(index, 1);
    localStorage.setItem('order', JSON.stringify(order));

    listOfTotal = [];

    for (var j = 0; j < order.length; j++) {



      total = order[j].count * order[j].price;
      listOfTotal.push(total);
      //console.log(listOfTotal);

      //  total += "total" + order[i].count * order[i].price;


      //console.log(listOfTotal);

    }



    // uppdatera automatisk totalsuman.


  });
 // vad som ska skickas till apiet
  function createOrder() {
    var thingToSend = {
      CompanyId: 99,
      Created: getDateTime(),
      CreatedBy: document.getElementById("mail").value,
      TotalPrice: auto(),
      Status: 1,
      PaymentMethod: "paypal",
      OrderRows: []
    };

    for (var i = 0; i < order.length; i++) {


      thingToSend.OrderRows.push({
        ProductId: order[i].Id,
        Amount: order[i].count
      });


    }

    return thingToSend;
  }



  $(".saveAndSend").on("click", function() {
    // medelandet som vi bygger upp.
    var errormessage = "";
    // sätter att allt är ok från början och ändrar till false när validerigen misslyckas.
    var success = true;

    // firstName
    if (document.getElementById("firstName").value == "") {
      errormessage += "Fill in the box for first name \n";
      document.getElementById("firstName").style.borderColor = "red";
      success = false;
    }

    // lastName
    if (document.getElementById("lastName").value == "") {
      errormessage += "Fill in the box for last name \n";
      document.getElementById("lastName").style.borderColor = "red";
      success = false;
    }

    // Mobilnummer
    var number = document.getElementById("number").value;
    if (number == "") {
      errormessage += "Fill in the box for number\n";
      document.getElementById("number").style.borderColor = "red";
      success = false;
    } else {
      // validear nummret. måste vara 10 siffror.
      if (!validateNumber(number)) {
        errormessage += "Enter 10 digit number\n";
        success = false;
      }
    }


    var email = document.getElementById("mail").value;
    if (email == "") {
      errormessage += "Fill in the box for E-mail \n";
      document.getElementById("mail").style.borderColor = "red";
      success = false;
    } else {
      // validera mail,
      if (!validateEmail(email)) {
        errormessage += "Fill in correct E-mail \n";
        success = false;
      }
    }

    if (!success) {
      alert(errormessage);
      //om det var inga problem gör det här
    } else {
      $.ajax({
        method: "POST",
        url: "https://medieinstitutet-wie-products.azurewebsites.net/api/orders",
        data: JSON.stringify(createOrder()),
        contentType: "application/json; charset=utf-8",
        headers: {
          accept: "application/json"
        },
        success: function(result) {
          //skicka vidare till tack sidan!!!!!!!
          localStorage.clear(order);
          window.location.href = 'thankyoupageorder.html';
        },
        error: function(error) {

        }
      });
    }

  });

  auto();
});
