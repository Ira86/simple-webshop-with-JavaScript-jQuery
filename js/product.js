$(document).ready(function() {
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


	choise = getParameterByName("id");

	$.getJSON('http://medieinstitutet-wie-products.azurewebsites.net/api/products/' + choise, function (data) {
		$.getJSON('http://medieinstitutet-wie-products.azurewebsites.net/api/categories', function (categories) {   //Anropar kategorier med API



			//Lägg en Bootstrap klass row till container
			//Rows must be placed within a .container for proper alignment and padding.
			var container = $("#produktSida").addClass("row");

			//Skap en ny div med klass namnet "ProductImgContainer". Lägg en Bootstrap klass gridsklasser
			var productImgContainer = $("<div>").addClass("productImgContainer").addClass("col-xs-12 col-sm-6 col-md-6 .col-lg-6");
			//Skapa elementet img med src atributet som fångar upp data imageUrl med adressen till produktbilden och id för filmen. Kolla om klassen "product-img"behövs

			//Images in Bootstrap 3 can be made responsive-friendly via the addition of the .img-responsive class.
			//This applies max-width: 100%; and height: auto; to the image so that it scales nicely to the parent element.

			//Med klass img-responsive
			var newImage = $("<img>").attr("src",data.imageUrl).attr("id",data.id).addClass("product-img").addClass("img-responsive");

			//Skap ytterligare ny en div med klass namnet "ProductInfoContainer". Lägg en Bootstrap klass gridsklasser
			var productInfoContainer = $("<div>").addClass("productInfoContainer").addClass("col-xs-12 col-sm-6 col-md-6 .col-lg-6");

			//Skapa p element för att fånga product info data och lägg ev till klass för styling
			var newName = $("<p>").text(data.name).addClass("product-name");
			var newPrice = $("<p>").text("Price: "+ data.price + " kr").addClass("product-price");

			var order = [];

			//Köp knapp. Här har den fått den Bootstrap klass. Just nu är "buy" klassen överföldig
			var buy = $("<button>").addClass("btn btn-primary btn-lg")
				.addClass("glyphicon glyphicon-shopping-cart")
				.addClass("buy")
				.attr("id","buy")
				.text("Buy")
				.attr("productid", data.id)
				.click(function() {
					addToCart($(this).attr("productid"));
				});

			var descriptionHorizontal = $("<dl>").addClass("dl-horizontal");
			var newDescription = $("<dd>").text(data.description).addClass("product-desc");
			var newYear = $("<dt>").text("Year: "+ data.year).addClass("product-year");

			//Denna behöver loppas för att få kategorin
			//var newProductCategory = $("<dt>").text("Genre: " + data.productCategory).addClass("product-category");
			for (var i = 0; i < categories.length; i++) {															//Loopar igenom resultat p� produkter
				for(var j = 0; j < data.productCategory.length; j++) {										//Loopar igenom kategorier p� den produkt som �r klickt
					if (data.productCategory[j].categoryId == categories[i].id) {
						//Denna behöver loppas för att få kategorin
						var newProductCategory = $("<dt>").text("Genre: " + categories[i].name).addClass("product-category");
					}
				}
			}

			//Gör 2 st nya divar och lägg den i diven som finns på product.html sidan med namnet class container
			//Den första diven är för produkt bild
			productImgContainer.appendTo($("#produktSida"));
			//Lägg också själva produktbilden i klass container på product.html sidan
			newImage.appendTo($("#produktSida"));

			//Den andra diven för produktinfo
			productInfoContainer.appendTo($("#produktSida"));

			//Lägg all produktinfo i klass container på product.html sidan
			newName.appendTo($("#produktSida"));

			newPrice.appendTo($("#produktSida"));
			buy.appendTo($(".buyButton"));

			newDescription.appendTo($("#produktSida"));
			newYear.appendTo($("#produktSida"));
			newProductCategory.appendTo($("#produktSida"));


			//Nästa steg, lägg in bilden i den nya diven för produktbild
			newImage.appendTo($(productImgContainer));
			//Och allt annat i den andra diven för produktinformation
			newName.appendTo($(productInfoContainer));
			newPrice.appendTo($(productInfoContainer));
			buy.appendTo($(productInfoContainer));
			newDescription.appendTo($(productInfoContainer));

			newYear.appendTo($(productInfoContainer));
			newProductCategory.appendTo($(productInfoContainer));
		});
	});
});
