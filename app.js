$(document).ready(function() {

    //create an array of strings, each with a different topic
    //save to a variable called "topics"
    //take topics in the array and create buttons in HTML (using loop that appends a button for each string in the array)
    //if user clicks on a button, page displays 10 static non animated-gif images from the GIPHY API and places them on the page
    //under every gif display it's rating (provided by the GIPHY API)
    //when user presses each button, animate the GIF. If clicked again, GIF stops animating

    //add a form to your page takes the value from user input box and add it to "topics" array
    //make a function call that takes each topic in the array remakes the buttons on the page

    var dogBreeds = ["german shepherd", "labrador retriever", "american pit bull terrier", "basset hound", "bichon frise", "shiba inu", "dachshund", "corgi"];

    // loop to create the inital buttons
    for (var i =0; i < dogBreeds.length; i++) {
        var dogBtn = $("<button>");
        dogBtn.addClass("dog-button");
        dogBtn.attr("data-name", dogBreeds[i]);
        dogBtn.text(dogBreeds[i]);
        $("#buttons-view").append(dogBtn);
    }

    // function to add new buttons to the page
    function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < dogBreeds.length; i++) {

            var newAdd = $("<button>");
            newAdd.addClass("dog-breed");
            newAdd.attr("data-name", dogBreeds[i]);
            newAdd.text(dogBreeds[i]);
            $("#buttons-view").append(newAdd);
        }
    }

    //function that handles what happends when the button is clicked
    $("#new-breed").on("click", function(event){
        event.preventDefault();

        var addition = $("#dog-input").val().trim();

        dogBreeds.push(addition);

        renderButtons();
    });

    //function for displaying gifs on the page
    function displayDogGif() {
        
        var dog = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + dog + "&api_key=a6Np9Ivm9wDWPNe2DdjM0dL5uU7bysex&limit=10"

        //ajax call
        $.ajax ({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            // 
            var results = response.data;

            for (var i = 0; i <results.length; i++) {
                var animalDiv = $("<div>");
                var p = $("<p>");
                p.text(results[i].rating);
                var animalImage = $("<img>");
                animalImage.attr("src", results[i].images.fixed_height.url);
                animalImage.addClass("pic")
                animalDiv.append(p);
                animalDiv.append(animalImage);
                $("#gifs").prepend(animalDiv);
            }
        });

        // if ()
    }

    $(document).on("click", ".dog-breed", displayDogGif);
    
        renderButtons();

});