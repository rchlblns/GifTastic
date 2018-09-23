$(document).ready(function() {

    var dogBreeds = ["german shepherd", "basset hound", "shiba inu", "dachshund", "corgi"];

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
        
        $("#gifs").empty();

        var dog = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dog + "&api_key=a6Np9Ivm9wDWPNe2DdjM0dL5uU7bysex&limit=10"

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
                    p.text("rating: " + results[i].rating);
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