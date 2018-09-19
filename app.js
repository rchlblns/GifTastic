$(document).ready(function() {

    //create an array of strings, each with a different topic
    //save to a variable called "topics"
    //take topics in the array and create buttons in HTML (using loop that appends a button for each string in the array)
    //if user clicks on a button, page displays 10 static non animated-gif images from the GIPHY API and places them on the page
    //under every gif display it's rating (provided by the GIPHY API)
    //when user presses each button, animate the GIF. If clicked again, GIF stops animating

    //add a form to your page takes the value from user input box and add it to "topics" array
    //make a function call that takes each topic in the array remakes the buttons on the page

    var dogBreeds = ["german shepherd", "labrador retriever", "american staffordshire terrier", "basset hound", "bichon frise", "rat terrier", "dachshund", "corgi"];

    // function to create the inital buttons
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
});