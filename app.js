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

    renderButtons();

    //click event that handles what happends when the "add" button is clicked
    $("#new-breed").on("click", function(event){
        event.preventDefault();

        var addition = $("#dog-input").val().trim();

        dogBreeds.push(addition);

        renderButtons();

        $("#dog-input").val("")
    });

    //function for displaying gifs on the page
    function displayDogGif() {
        
        var dog = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + dog + "&api_key=a6Np9Ivm9wDWPNe2DdjM0dL5uU7bysex&limit=10"

        //ajax call to fetch gifs
        $.ajax ({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            // 
            var results = response.data;


            for (var i = 0; i < results.length; i++) {

                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var animalDiv = $("<div>");
                    var p = $("<p>");
                    p.text(results[i].rating);
                    var animalImage = $("<img>");
                    animalImage.attr("src", results[i].images.fixed_height_still.url);
                    animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                    animalImage.attr("data-animate", results[i].images.fixed_height.url);
                    animalImage.attr("data-state", "still");
                    animalImage.addClass("pic")
                    animalDiv.append(p);
                    animalDiv.append(animalImage);
                    $("#gifs").prepend(animalDiv);
                }
            }

        });

        // $("#gifs").on("click", function() {
            
        //     var state = $(this).attr("data-state");
        //     var still = $(this).attr("data-animate");
        //     var animate = $(this).attr("data-still");
    
        //     if (state === "still") {
        //         $(this).attr("src", animate);
        //         $(this).attr("data-state", "animate");
        //     }
        //     else {
        //         $(this).attr("src", still);
        //         $(this).attr("data-state", "still");
        //     }
        // });

    }

    function changeState(){
            
        var state = $(this).attr("data-state");
        var still = $(this).attr("data-animate");
        var animate = $(this).attr("data-still");
    
        if (state === "still") {
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
        }

    }   

    $(document).on("click", ".dog-breed", displayDogGif);

    $(document).on("click", ".pic", changeState);
    

});