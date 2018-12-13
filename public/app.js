console.log("linked");

function getResults() {
    // Empty any results currently on the page
    $("#results").empty();
    // Grab all of the current notes
    $.getJSON("/all", function(data) {
      // For each note...
      for (var i = 0; i < data.length; i++) {
        // ...populate #results with a p-tag that includes the note's title and object id
        $("#results").prepend("<p class='data-entry' data-id=" + data[i]._id + "><span class='dataTitle' data-id=" +
          data[i]._id + ">" + data[i].title + "</span><span class=delete>X</span><span class=save> Save</span></p>");
      }
    });
  }
  
  // Runs the getResults function as soon as the script is executed
  getResults();

// access /scape when the button is clicked 
$("#scrape").on("click", function() {
    $.ajax({
        method: "GET",
        url: "/scrape",
    }).done(function(data) {
        console.log(data)
        window.location = "/"
    })
    .then(function(data) {
        // Add the title and delete button to the #results section
          $("#results").prepend("<p class='data-entry' data-id=" + data._id + "><span class='dataTitle' data-id=" +
          data._id + ">" + data.title + "</span><span class=delete> X</span> </p>");
          // Clear the note and title inputs on the page
          $("#note").val("");
          $("#title").val("");
        });
});

$("#clear-all").on("click", function() {
    // Make an AJAX GET request to delete the notes from the db
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "/clearall",
      // On a successful call, clear the #results section
      success: function(response) {
        $("#results").empty();
      }
    });
  });

  $(document).on("click", ".delete", function() {
  // Save the p tag that encloses the button
  var selected = $(this).parent();
  // Make an AJAX GET request to delete the specific note
  // this uses the data-id of the p-tag, which is linked to the specific note
  $.ajax({
    type: "GET",
    url: "/delete/" + selected.attr("data-id"),

    // On successful call
    success: function(response) {
      // Remove the p-tag from the DOM
      selected.remove();
      // Clear the note and title inputs
      $("#note").val("");
      $("#title").val("");
      // Make sure the #action-button is submit (in case it's update)
      $("#action-button").html("<button id='make-new'>Submit</button>");
    }
  });
});

$(document).on("click", ".save", function() {
  // Save the p tag that encloses the button
  var selected = $(this).parent();
  // Make an AJAX GET request to delete the specific note
  // this uses the data-id of the p-tag, which is linked to the specific note
  $.ajax({
    type: "POST",
    url: "/saved/" + selected.attr("data-id"),

    // On successful call
    success: function(response) {
      // Remove the p-tag from the DOM
      selected.remove();
      // Clear the note and title inputs
      $("#note").val("");
      $("#title").val("");
      // Make sure the #action-button is submit (in case it's update)
      $("#action-button").html("<button id='make-new'>Submit</button>");
      console.log(response);
    }
  });
});


  