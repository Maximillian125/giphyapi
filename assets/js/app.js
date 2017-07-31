var tvShows = ["Scrubs", "Parks and Recreation", "Rick and Morty", "Peaky Blinders"];

var displayGifs = function() {
	var name = $(this).data("name");
	var queryURL = ("http://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=4c49a665be9941fcb33ba379c456c621&limit=5");
	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function(response) {
	        console.log(queryURL);
	        console.log(response);
	    	
	    for (var i = 0; i < response.data.length; i++) {
	    	console.log(response.data[i].images.fixed_height);
	      console.log(response.data[i].rating);


  			var gifDiv = $("<div class='gif'>");
  			var rating = response.data[i].rating;
  			var p = $("<p>").text("Rating: " + rating);

  			var animated = response.data[i].fixed_height;


        console.log('url', response.data[i]);


  			var still = response.data[i].fixed_height_still.url;
  			var image = $('<img>').attr('src', animated);

	      gifDiv.append(p);
	      gifDiv.append(image);
	      $("#gifView").append(gifDiv);
	    
	    }
		
	});
		
	
}

 function renderButtons(gif, buttonsView) {
        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttonsView").empty();
        // Loops through the array of movies
        for (var i = 0; i < tvShows.length; i++) {
          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of movie to our button
          a.addClass("gif");
          // Added a data-attribute
          a.attr("data-name", tvShows[i]);
          // Provided the initial button text
          a.text(tvShows[i]);
          // Added the button to the buttons-view div
          $("#buttonsView").append(a);
        }
}

      $("#addGif").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var gif = $("#gif-input").val().trim();
        // The movie from the textbox is then added to our array
        tvShows.push(gif);
        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });
      // Adding click event listeners to all elements with a class of "movie"
      $(document).on("click", ".gif", displayGifs);
      // Calling the renderButtons function to display the intial buttons
      renderButtons();

      $(".gif").on("click", function() {
     
      var state = $(this).attr("data-state");
      var animated = $(this).attr("data-animate")
      var still = $(this).attr("data-still")
      
      if(state === 'still') {
        $(this).attr("src", animated);
        $(this).attr('data-state', 'animate');
      } else {
        $(this).attr('src', still)
        $(this).attr('data-state', 'still')
      }
      // ==============================================
      // STEP FOUR: open the file in the browser and click on the images.
      // Then click again to pause.
    });