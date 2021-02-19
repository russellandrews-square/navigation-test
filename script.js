$(document).ready(function(){

	positionPopovers();
	showPopovers();
	populateQuickAccess();

	$(window).resize(function(){
		positionPopovers();
	})

	function positionPopovers(){
		var windowHeight = $(window).height();

		$("ul.categories li").each(function() {

			var offset = $(this).offset();

			var id = this.id;

			var popover = $("div.popover#" + id);

			var popoverHeight = popover.height();

			if ( (offset.top + popoverHeight) > windowHeight == false ){
				popover.css("top", offset.top - 24);
			} else {
				popover.css("top", windowHeight - popoverHeight - 48);
			}
		})
	}

	function showPopovers(){

		$("ul.categories li, div.popover").on({

			mouseenter: function() {
				var id = this.id;
				$("div.popover#" + id).addClass("show");
				$("ul.categories li#" + id + " a p").css("color", "var(--emphasis");
			},

			mouseleave: function() {
				var id = this.id;
				$("div.popover#" + id).removeClass("show");	
				$("ul.categories li#" + id + " a p").css("color", "var(--text-10");
			}

		})
	}

	$("body button#menu").click(function(){
		var windowWidth = $(window).width();

		$("body div.app-menu").toggleClass("show");
		$("body.product div#veil").addClass("show");

		if (windowWidth < 600){
			$("body div#veil").addClass("show");
		}
	})

	$("body button#menu").click(function(){
		$("body div.app-menu").toggleClass("hide");
	})

	$("button#menu-close").click(function(){
		$("body div#veil").removeClass("show");
		$("body div.app-menu").removeClass("show");
	})

	var edit = false;

	$("ul.categories li").click(function(){
		var id = this.id;
		var windowWidth = $(window).width();

		$("div.secondary-page#" + id ).addClass("show");

		if ( windowWidth < 600 ) {
			$("div.app-menu").css("html, body", "overflow-y: hidden");
		}
	})

	$("button#back").click(function(){
		$("div.secondary-page").removeClass("show");
		if ( windowWidth < 600 ) {
			$("div.app-menu").css("html, body", "overflow-y: auto");
		}
	})

	$("button#edit").click(function(){
		$( ".sortable" ).sortable({ axis: "y" });
		$("div.modal").addClass("show");
		$("body.product div.app-menu").removeClass("show");
		$("body:not(.product) div#veil").addClass("show");
	})

	$("div.modal button").click(function(){
		var windowWidth = $(window).width();
		$("body.product div.app-menu").addClass("show");
		$("div.modal").removeClass("show");
		if (windowWidth > 600){
			$("body:not(.product) div#veil").removeClass("show");
		}
	})

	$("div#veil").click(function(){
		var windowWidth = $(window).width();
		$("div#veil, body div.app-menu, div.modal").removeClass("show");

		$("div.secondary-page").addClass("very-left");

		setTimeout(function(){
			$("div.secondary-page").removeClass("show");
				setTimeout(function(){
					$("div.secondary-page").removeClass("very-left");
				}, 10)
		}, 300)

		if ( windowWidth < 600 ) {
			$("div.app-menu").css("html, body", "overflow-y: auto");
		}
	})

	function populateQuickAccess(){

		$("ul#my-products div li").remove();

		$("tr").each(function(){
			if ($(this).children("td").children("input:checked").length > 0){
				var value = $(this).children("td").children("input").val();

				var string = $(this).children("td:nth-child(2)").text();

				var url = "product.html"

				if ( string == "Home"){
					url = "index.html"
				}

				$("ul#my-products > div").append("<li><div class='icon' style='background-image: url(assets/" + value + ".svg)';></div><a href='" + url + "'><p class='emphasis-30'>" + string + "</p></a></li>");
			}
		})
	}

	$("div#edit.modal div.header button.primary").click(function(){
		populateQuickAccess();
	});
})