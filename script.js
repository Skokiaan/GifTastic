var instrumentArray = ["bass", "bassoon", "ukulele", "oboe", "cowbell"];


// creates buttons for each instrument
function renderButtons() {

    $("#instBtns").empty();
    for (var i = 0; i < instrumentArray.length; i++) {
        var x = $("<button>");
        x.addClass("buttons");
        x.attr("data-name", instrumentArray[i]);
        x.html(instrumentArray[i]);
        $("#instBtns").append(x);

    } // end for loop


} // end renderButtons


$(document).ready(function() {

    renderButtons();

    //Add new instrument button
    $("#addInst").on("click", function(event) {
        event.preventDefault();
        var newInstrument = $("#instInput").val().trim();
        instrumentArray.push(newInstrument);
        renderButtons();
        console.log(instrumentArray);

    });
    // end on-click add button


    $(document).on("click", ".buttons", addImag);
    //$(".buttons").on("click", addImag);

}); // end doc.ready

function addImag(instrument) {
    event.preventDefault();
    var instrument = ($(this).attr("data-name"));
    console.log(instrument);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + instrument + "&rating?&limit=10&r=json&api_key=dc6zaTOxFJmzC";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);
        var resBody = response.data;
        $("#pictures").empty();
        console.log(resBody.length);
        for (var i = 0; i < resBody.length; i++) {

            var newImg = $("<img>");
            newImg.addClass("image");
            newImg.attr("src", resBody[i].images.fixed_height_still.url);
            newImg.attr("data-animated", resBody[i].images.fixed_height.url);
            newImg.attr("data-still", resBody[i].images.fixed_height_still.url);
            newImg.attr("data-state", "still");

            var rating = resBody[i].rating;
            var p = $("<p>").text("Rating: " + resBody[i].rating);
            console.log("Rating: " + rating);


            $("#pictures").append(newImg);
            $("#pictures").append(p);

        } // end for loop

    }); // end done function

} // end addImag function


//  check data-state
$(document).on("click", ".image", function() {
    var state = $(this).attr("data-state");

    if (state == "still") {
        $(this).attr("src", $(this).attr("data-animated"));
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}); // end on click
