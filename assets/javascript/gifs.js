$(document).ready(function() {
	var initialButtonValues = ["dove", "turtle", "ostrich"];
	const API_KEY = "69777a707ff64e1c8accdcc450d9c54c";
	const LIMIT = 5;
	for(var i = 0; i < initialButtonValues.length; i++) {
		addGifButton(initialButtonValues[i]);
	}
	$(".add-gif-button").click(function(event) {
		event.preventDefault();
		var buttonAdditionValue = $(".add-gif-input").val();
		addGifButton(buttonAdditionValue);
	});
	function addGifButton(textInButton) {
		var $button = $("<button>").addClass("search-gifs-button").attr("data-search-word", textInButton).text(textInButton);
		$(".gif-buttons-added").append($button);
		$button.click(function(event) {
			var buttonSearchValue = $(this).attr("data-search-word");
			searchGiphyApi(buttonSearchValue);
		});
		$(".add-gif-input").val("");
	}
	function appendGiphyResults(results) {
		$(".giphy-results").append(results);
	}
	function clearGiphyResults() {
		$(".giphy-results .gif").hide();
	}
	function searchGiphyApi(gihpySearchTerm) {
		debugger;
		clearGiphyResults();
		if($(".gif-" + gihpySearchTerm).length > 0) {
			$(".gif-" + gihpySearchTerm).show();
		} else {
			var ajaxUrl = "http://api.giphy.com/v1/gifs/search?q=" + gihpySearchTerm + "&api_key=" + API_KEY + "&limit=" + LIMIT;
			var xhr = $.get(ajaxUrl);
			xhr.done(function(response) {
				var responseData = response.data;
				// console.log("success got data", responseData);
				//clearGiphyResults();
				for (var i = 0; i < Math.min(responseData.length, LIMIT); i++) {
					// console.log(responseData[i].data);
					var gifUrlStill = responseData[i].images.fixed_height_still.url;
					var gifUrlAnimated = responseData[i].images.fixed_height.url;
					$gifImg = $("<img>").attr("src", gifUrlStill).addClass("gif gif-" + gihpySearchTerm);
					$gifImg.attr("data-still", gifUrlStill);
					$gifImg.attr("data-animated", gifUrlAnimated);
					$gifImg.attr("data-state", "still");
					appendGiphyResults($gifImg);
				}
				$(".gif-" + gihpySearchTerm).click(function(event) {
					if($(this).attr("data-state") === "still") {
						$(this).attr("src", $(this).attr("data-animated"));
						$(this).attr("data-state", "animated");
					} else {
						$(this).attr("src", $(this).attr("data-still"));
						$(this).attr("data-state", "still");
					}
				});
			});
		}
	}
});
0