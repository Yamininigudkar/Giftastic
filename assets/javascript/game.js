 
  ///Intial Array of Sport persons
    var sprtPerson = ["Lebron James", "Stephan Curry", "Roger Federer", "Michael Jordan"];
    // displayMovieInfo function re-renders the HTML to display the appropriate content


      // Function for displaying sportperson gif
      function displaySportpersongif()
       {
        //debugger;
        $("#Sports-person-view").empty();
        var sportperson = $(this).attr("data-name");

        console.log(sportperson);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        sportperson + "&api_key=dc6zaTOxFJmzC&limit=10";

       // $("#Sports-person-view").empty();

        // Creating an AJAX call for the specific movie button being clicked
         $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
          // Storing an array of results in the results variable
          console.log(response)
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") 
            {
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");
                            

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var personImage = $("<img>");
              personImage.attr("data-still",results[i].images.fixed_height_still.url)
              personImage.attr("data-animate",results[i].images.fixed_height.url)
              personImage.attr("data-state","still")
              personImage.addClass("gif")
              personImage.addClass("img-thumbnail")

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              personImage.attr("src", results[i].images.fixed_height_still.url);

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(personImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#Sports-person-view").prepend(gifDiv);
             
            }
          }
             $(".gif").on("click", function() 
              {
                // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                var state = $(this).attr("data-state");
                //debugger;
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                // Else set src to the data-still value
                if (state === "still") 
                {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } else 
                {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }
            });
        });
       } 


      function renderButtons() 
      {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        //var a = $("<button>");

        // Looping through the array of movies
        for (var i = 0; i < sprtPerson.length; i++)
        {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          
          //debugger;
          // Adding a class of movie to our button
          a.addClass("sportPerson");
          a.addClass("btn btn-primary")

          // Adding a data-attribute
          a.attr("data-name", sprtPerson[i]);
          // Providing the initial button text
          a.text(sprtPerson[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a movie button is clicked
      $("#add-sportPerson").on("click", function(event)
      {
        event.preventDefault();
        // This line grabs the input from the textbox
        var spPerson = $("#Sportperson-input").val().trim();

        // Adding movie from the textbox to our array
        sprtPerson.push(spPerson);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "sportPerson"
      $(document).on("click", ".sportPerson", displaySportpersongif);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
   