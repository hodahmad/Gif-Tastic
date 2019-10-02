//create a variable (topics) that contains the buttons of the gifs of TV shows when users arrives on page
var topics = [
	"The Vampire Diaries",
	"Community",
	"The Office",
	"Gossip Girl",
	"The 100",
	"Orange is the New Black",
	"Big Bang Theory",
	"13 Reasons Why",
	"Stranger Things",
	"How I Met Your Mother",
	"Arrow",
	"The Originals",
	"Uncontrollably Fond",
	"Phineas and Ferb",
];

//loop through the array of TV shows and attr the data about the gif 
for(var i = 0; i < topics.length; i++) {
	var button = $("<button>").text(topics[i]);
	button.attr("gif-data", topics[i]);
	button.addClass("gif-button");
	$("#button-group").append(button);
}

//create function that allows gifs to appear when the buttons are pressed 
$("#add-gif-button").on("click", function(tv) {
	tv.preventDefault();
	var alreadyExist = false;
	if(topics.indexOf($("new-gif-input").val()) !== -1) {
		alreadyExist = true;
	}
	if($("new-gif-input").val() !== "" && alreadyExist === false) {
        //include search results that are all caps or all lowercase, etc 
        var newGif = $("new-gif-input").val().toLowerCase();
        //push array and variable
		topics.push(newGif);
		var button = $("<button>").text(newGif);
		button.attr("gif-data", newGif);
		button.addClass("gif-button");
		$("#button-group").append(button);
	}
	$("new-gif-input").val("");
});

//create function to connect data to gif button
$(document).on("click", ".gif-button", function() {
	var gif = $(this).attr("gif-data");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
    	url: queryURL,
    	method: "GET"
    }).done(function(response) {
    	var results = response.data;

		var resultsContainerSection = $("<section class='results-container'>");

    	for(var i = 0; i < results.length; i++) {
    		var resultDiv = $("<div class='result-container'>");
    		
    		var rating = results[i].rating;

    		var p = $("<p>").text("Rating: " + rating);

    		var gifImg = $("<img class='result'>");
    		gifImg.attr("src", results[i].images.fixed_height_still.url);
    		gifImg.attr("data-state", "still");
    		gifImg.attr("data-still", results[i].images.fixed_height_still.url);
    		gifImg.attr("data-animate", results[i].images.fixed_height.url);

    		resultDiv.prepend(gifImg);
    		resultDiv.prepend(p);

    		resultsContainerSection.prepend(resultDiv);
    	}

    	$("#gifs-group").prepend(resultsContainerSection);
    });
});

$(document).on("click", ".result", function() {
	var state = $(this).attr("data-state");

	if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});