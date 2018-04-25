

//SEARCH FUNCTION Starts
function searchMovie() {

  $("#searchResult").html("");
  //skapar en variabel
  var searchInput = document.getElementById("searchInputField"); //$("#searchInputField");
  //skapar en variabel
  var searchUrl = "http://medieinstitutet-wie-products.azurewebsites.net/api/search?searchText=";
  //skapar en variabel som är searchInput och searchUrl
  var resultUrl = searchUrl + searchInput.value;




  $.getJSON(resultUrl, function(data) {


    var items = [];
    //här skapar jag mina html taggar och vad som ska skrivas ut.
    $.each(data, function(index, val) {
      items.push("<li class='dropFilm'>" +
        "<a class='dropFilmTextDecoration' href='product.html?id=" + val.id + "'>" +
        "<img src= '" + val.imageUrl + "' >" +
        "<span class='dropFilmText'>" + val.name + "</span>" +
        "</a>" +
        "</li>");
    });

    $("<ul/>", {
        "class": "my-new-list",
        html: items.join("")
      })
      .appendTo($("#searchResult"));
  });
}
//SEARCH FUNCTION ends


// när jag trycker på köp knappen så körs den här funktionen.
// knappen för specific film sparars i localStorage.
function addToCart(id) {
  $.getJSON('http://medieinstitutet-wie-products.azurewebsites.net/api/products/' + id, function(data) {
    //var data = $(this).data("info");
    var order = localStorage.getItem('order');

    if (order == null) {

      var orderItemList = [];

      var prod = {};
      prod.Id = data.id;
      prod.price = data.price;
      prod.name = data.name;
      prod.image = data.imageUrl;
      prod.count = 1;

      orderItemList.push(prod);
      localStorage.setItem('order', JSON.stringify(orderItemList));
    } else {

      var orderItemList = JSON.parse(order);

      //försök hitta produkten.
      var produkt = orderItemList.find(x => x.Id == data.id)

      if (produkt == undefined) {
        var prod = {};
        prod.Id = data.id;
        prod.price = data.price;
        prod.name = data.name;
        prod.image = data.imageUrl;
        prod.count = 1;

        orderItemList.push(prod);
      } else {
        //ta reda på vart i listan den är.
        var index = orderItemList.indexOf(produkt);

        produkt.count = Number(produkt.count) + 1;
        orderItemList.splice(index, 1, produkt);

      }

      localStorage.removeItem('order');
      localStorage.setItem('order', JSON.stringify(orderItemList));


    }
    getAmountOfItems();
  });
}

/**
 * Funktion för att visa det totala antalet filmer som ligger i kundkorgern.
 * Alla filmers amount läggs på var sitt index i en lista som sedan adderas
 * för att sen visas som en siffra på kundkorgen.
 */
function getAmountOfItems() {

  //console.log("Shpwing # items");
  var shoppingCart = JSON.parse(localStorage.getItem("order"));
  var noOfItems = [];
  for (var i = 0; i < shoppingCart.length; i++) {
    noOfItems.push(shoppingCart[i].count);
  }

  //reduce adderar alla siffor i en lista
  var sum = noOfItems.reduce(function(a, b) {
    return a + b;
  }, 0);


  //Sätter sum som datacount och sum innehåller det totala antalet filmer i kundkorgen
  console.log(sum);
  $("#noIfItemsBadge").attr("data-count", sum).addClass("badge");

  if (localStorage.getItem("order") != null) {


        $("#noIfItemsBadge").hover(function () {
                $("#shoppingCartDropdown").css("visibility", "visible");
            },
            function () {
                $("#shoppingCartDropdown").css("visibility", "hidden");
            });

        $("#shoppingCartDropdown").hover(function () {
                $("#shoppingCartDropdown").css("visibility", "visible");

				 },
            function () {
                $("#shoppingCartDropdown").css("visibility", "hidden");
            });

    }




var api = $.getJSON('http://medieinstitutet-wie-products.azurewebsites.net/api/products', function(result) {
  var order = JSON.parse(localStorage.getItem('order'));

    for (var i = 0; i < order.length; i++) {
			var cartInnerDiv = $("<div>").addClass("cartInnerDivStyle row");
            var cartInnerNameName = $("<span>").text(order[i].name).addClass("cartDropDownDiv col-md-10");
            var cartInnerNamePrice = $("<span>").text(order[i].price).addClass("cartDropDownDiv col-md-10");
            var cartInnerNameCount = $("<span>").text(order[i].count).addClass("cartDropDownDiv col-md-10");

            var delBtn = $("<span>").addClass("glyphicon glyphicon-trash delBtnSHoppDrop col-md-1").attr("id", result[i].id);

                        cartInnerNameName.appendTo(cartInnerDiv);
                        cartInnerNamePrice.appendTo(cartInnerDiv);
                        cartInnerNameCount.appendTo(cartInnerDiv);
                        delBtn.appendTo(cartInnerDiv);
                        //checkoutBtn.appendTo(cartInnerDiv);

                        $("#shoppingCartDropdown").append(cartInnerDiv);
                      }
 });
}

// när man trycker mer info så skickas man till produkt sidan för just den filmens information
function showMore(id) {
  window.location.href = "product.html?id=" + id;
}
$(document).ready(function() {
// när sidan storlek ändras till någon av de px så uppdateras sidan.
  $(window).on('resize',function(){
      if (($(window).width() == 768) || ($(window).width() == 769)) {
        location.reload();  // refresh page
      }
      else {
        // Width greater than 768px for PC
        // Or width is smaller than 480 for mobile
      }
  });



  var api = $.getJSON('http://medieinstitutet-wie-products.azurewebsites.net/api/products', function(result) {

    //$(".buyNow").on("click", addToCart);

    function getParameterByName(name, url) {
      // om man inte skickar in url så tar vi url från browsern.
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }



    var order = [];
    // på startsidan skriver jag ut 10 bilder som är de senaste filmerna.
    // och på bilderna skapar jag två knappar som är mer info och köp.
    // skapar massa divar och classer

    for (var i = 0; i < 10; i++) {
      var data = result[i];
      var buy = $("<button>").addClass("btn btn-primary buy").attr("id", "buy").text("Buy").attr("productid", data.id).click(function() {
        addToCart($(this).attr("productid"));
        getAmountOfItems();
      });
      if($(window).width() < 768) {
            var newDivImage = $("<div>").addClass("image").attr("onclick", "window.location.href='product.html?id=" + result[i].id + "'");

      }
      else {
              var newDivImage = $("<div>").addClass("image");
      }


      var moreInfo = $("<button>").addClass("btn btn-primary moreInfo").text("More info").attr("onclick", "window.location.href='product.html?id=" + result[i].id + "'");

      var newDiv = $("<div>").addClass("divImage");

      var newImage = $("<img>").attr("src", result[i].imageUrl).attr("id", result[i].id);

      var productInfo = $("<div>").addClass("productInfo");
      var productPrice = $("<h5>").addClass("productPrice").text(result[i].price + "kr");

      productPrice.appendTo($(productInfo));
      productInfo.appendTo($(newDivImage));

      buy.appendTo($(newDivImage));
      moreInfo.appendTo($(newDivImage));
      newDivImage.appendTo($(newDiv));
      newImage.appendTo($(newDivImage));

      newDiv.appendTo($(".mainContainer"));

    }


  });



  var latestMovies;


  console.log("Calling api");
  $.getJSON('http://medieinstitutet-wie-products.azurewebsites.net/api/random?number=8', Heyhopp);

  function Heyhopp(data) {
    console.log(data);

    var carousel = $("#carouse");
    data.sort(function(a, b) {
      return new Date(b.added).getTime() - new Date(a.added).getTime();
    });

    if ($(window).width() > 768) {
      for (var i = 0; i < data.length; i += 4) {
        if (i == 0) {

          var itemDiv = $("<div class='item active'>");
          $(itemDiv).append("<div class='film'><img src=" + data[i].imageUrl + " class='img-thumbnail'><div class='carousel-caption1'><span>" + data[i].description + "</span><div><button class='btn btn-primary showMore' type='button' onclick='showMore(" + data[i].id + ");'>More info</button><button class='btn btn-primary buyNow' type='button' onclick='addToCart(" + data[i].id + ");'> Buy</button></div></div>");
          $(itemDiv).append("<div class='film'><img src=" + data[i + 1].imageUrl + " class='img-thumbnail'><div class='carousel-caption1'><span>" + data[i + 1].description + "</span><div><button class='btn btn-primary showMore' type='button' onclick='showMore(" + data[i + 1].id + ");'>More info</button><button class='btn btn-primary buyNow'type='button' onclick='addToCart(" + data[i + 1].id + ");'> Buy</button></div></div>");
          $(itemDiv).append("<div class='film'><img src=" + data[i + 2].imageUrl + " class='img-thumbnail'><div class='carousel-caption1'><span>" + data[i + 2].description + "</span><div><button class='btn btn-primary showMore'type='button' onclick='showMore(" + data[i + 2].id + ");'>More info</button><button class='btn btn-primary buyNow'type='button' onclick='addToCart(" + data[i + 2].id + ");'> Buy</button></div></div>");
          $(itemDiv).append("<div class='film'><img src=" + data[i + 3].imageUrl + " class='img-thumbnail'><div class='carousel-caption1'><span>" + data[i + 3].description + "</span><div><button class='btn btn-primary showMore'type='button' onclick='showMore(" + data[i + 3].id + ");'>More info</button><button class='btn btn-primary buyNow'type='button' onclick='addToCart(" + data[i + 3].id + ");'> Buy</button></div></div>");

          carousel.append(itemDiv);
        } else {
          var itemDiv = $("<div class='item'>");
          $(itemDiv).append("<div class='film'><img src=" + data[i].imageUrl + " class='img-thumbnail'><div class='carousel-caption1'><span>" + data[i].description + "</span><div><button class='btn btn-primary showMore' type='button' onclick='showMore(" + data[i].id + ");'>More info</button><button class='btn btn-primary buyNow' type='button' onclick='addToCart(" + data[i].id + ");'> Buy</button><div></div>");
          $(itemDiv).append("<div class='film'><img src=" + data[i + 1].imageUrl + " class='img-thumbnail'><div class='carousel-caption1'><span>" + data[i + 1].description + "</span><div><button class='btn btn-primary showMore' type='button' onclick='showMore(" + data[i + 1].id + ");'>More info</button><button class='btn btn-primary buyNow' type='button' onclick='addToCart(" + data[i + 1].id + ");'> Buy</button></div></div>");
          $(itemDiv).append("<div class='film'><img src=" + data[i + 2].imageUrl + " class='img-thumbnail'><div class='carousel-caption1'><span>" + data[i + 2].description + "</span><div><button class='btn btn-primary showMore'type='button' onclick='showMore(" + data[i + 2].id + ");'>More info</button><button class='btn btn-primary buyNow' type='button' onclick='addToCart(" + data[i + 2].id + ");'> Buy</button></div></div>");
          $(itemDiv).append("<div class='film'><img src=" + data[i + 3].imageUrl + " class='img-thumbnail'><div class='carousel-caption1'><span>" + data[i + 3].description + "</span><div><button class='btn btn-primary showMore'type='button' onclick='showMore(" + data[i + 3].id + ");'>More info</button><button class='btn btn-primary buyNow' type='button' onclick='addToCart(" + data[i + 3].id + ");'> Buy</button></div></div>");

          carousel.append(itemDiv);
        }
      }
    } else {
      for (var i = 0; i < data.length; i++) {
        if (i == 0) {
          var itemDiv = $("<div class='item active'>");
          $(itemDiv).append("<div class='film'><a href='product.html?id=" + data[i].id + "'><img src=" + data[i].imageUrl + " class='img-thumbnail' /></a><div class='carousel-caption1'><span>" + data[i].description + "</span></div>");
          carousel.append(itemDiv);
        } else {
          var itemDiv = $("<div class='item'>");
          $(itemDiv).append("<div class='film'><a href='product.html?id=" + data[i].id + "'><img src=" + data[i].imageUrl + " class='img-thumbnail'></a><div class='carousel-caption1'><span>" + data[i].description + "</span></div>");
          carousel.append(itemDiv);
        }
      }
    }


    latestMovies = data;
    console.log(latestMovies);
    getAmountOfItems();
  }

  // här skriver vi ut film kategorierna på vår dropdown tab.
  $.getJSON('http://medieinstitutet-wie-products.azurewebsites.net/api/categories', function(result) { //Anropar kategorier med API
    var ul = $(".dropdown-menu"); //Skapar UL

    for (var i = 0; i < result.length; i++) { //Loop resultat
      var li = $("<li>"); //Skapar <li>

      var a = $("<a>").attr("href", "kategori.html?id=" + result[i].id).text(result[i].name); //Skapar länkar för <li>
      a.appendTo(li);

      li.appendTo(ul);


    }
  });

});
