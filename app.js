$(document).ready(function() {

  var shows = ['The Blacklist', 'Shades Of Blue', 'White Collar', 'Burn Notice', 'Prison Break', 'The Voice', 'The Walking Dead'];

  function displayShowView() {
    var tvShow = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShow + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      var results = response.data;
      console.log(results);
      $('#shows-view').empty();
      for (var i = 0; i < results.length; i++) {

        var showImage = $('<img id="gifs">');
        showImage.attr('src', results[i].images.fixed_height_still.url);
        showImage.attr('data-animate', results[i].images.fixed_height.url);
        showImage.attr('data-still', results[i].images.fixed_height_still.url);
        showImage.attr("data-state", "still");
        showImage.on('click', gifState);
        $('#shows-view').append(showImage);
        
        var rating = $('<p id="ratings">').text("Rating: " + results[i].rating);
        $('#shows-view').append(rating);
      }     
    });
  }

  function renderButtons() {
    $('#buttons-view').empty();
    for (var i = 0; i < shows.length; i++) {
      var button = $('<button id="buttons">');
      button.addClass('showButton');
      button.attr('data-name', shows[i]);
      button.text(shows[i]);
      $('#buttons-view').append(button);
    }
  }  

  function gifState() { 
        var state = $(this).attr('data-state');
        console.log(state);
        if (state === 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
  }

      $("#addShow").on("click", function(event) {
        event.preventDefault();
        var tvShow = $("#shows-input").val().trim();
        shows.push(tvShow);
        $('#shows-input').val('');
        renderButtons();
      });

      $(document).on("click", ".showButton", displayShowView);
      renderButtons();
});