function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


$(document).ready(function() {

	$.getJSON('http://medieinstitutet-wie-products.azurewebsites.net/api/products', function (result) {   //Anropar produkter med API
	  	$.getJSON('http://medieinstitutet-wie-products.azurewebsites.net/api/categories', function (categories) {   //Anropar kategorier med API
			for (var i = 0; i < result.length; i++) {															//Loopar igenom resultat p� produkter
				for(var j = 0; j < result[i].productCategory.length; j++){										//Loopar igenom kategorier p� den produkt som �r klickt
					if (result[i].productCategory[j].categoryId == getParameterByName("id")){					//Om den den klickta produkt har kategori...Visa mig den produkt
						var buy = $("<button>").addClass("btn btn-primary").addClass("buy").text("Buy").attr("productid", result[i].id).click(function() {
              addToCart($(this).attr("productid"));
            });

						 var moreInfo = $("<button>").addClass("btn btn-primary").addClass("moreInfo").text("More info").attr("onclick", "window.location.href='product.html?id=" + result[i].id + "'");


						var categoryDiv = $("<div>").addClass("categoryImage");
						var newDivImage = $("<div>").addClass("image");
						var newImage = $("<img>").attr("src",result[i].imageUrl).attr("id",result[i].id);

						var productInfo = $("<div>").addClass("productInfo");
						var productPrice =$("<h5>").addClass("productPrice").text(result[i].price + "kr");

						productPrice.appendTo($(productInfo));
						productInfo.appendTo($(newDivImage));

						buy.appendTo($(newDivImage));
						moreInfo.appendTo($(newDivImage));
						newDivImage.appendTo($(categoryDiv));
						newImage.appendTo($(newDivImage));

						categoryDiv.appendTo($(".categoryContainer"));
					}
				}



			}
		});

	});

	$.getJSON('http://medieinstitutet-wie-products.azurewebsites.net/api/categories', function (result) {			//Anropar kategorier med API
		var ul = $("#filterList");																				//Skapar UL

		for(var i = 0; i < result.length; i++) {										//Loop resultat
			var li = $("<li>");															//Skapar <li>

			var a = $("<a>").attr("href", "kategori.html?id=" + result[i].id).text(result[i].name);			//Skapar l�nkar f�r <li>
			a.appendTo(li);

			li.appendTo(ul);


		}
	});
});
