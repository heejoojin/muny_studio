var count = 0;

function addToCart() {
    Create the HTML for the message
    var msg = '<div class=\"header\"><a id=\"close\" href="#"><h2 id="close">&#10005;<h2></a></div>';
    msg += '<div><h2>This Membership Webpage is Currently Under Construction</h2>';
    msg += 'we are in the process of updating sign&ndash;up and sing&ndash;in functionality!<br/>';
    msg += 'we recommend you to use your google account to join our membership :)<br/>thank you so much for your understanding <i class="fa fa-heart" id="heart" aria-hidden="true"></i></div>';

    var elNote = document.createElement('div');       // Create a new element
    elNote.setAttribute('id', 'note');                // Add an id of note
    elNote.innerHTML = msg;                           // Add the message
    document.body.appendChild(elNote);                // Add it to the page

    function dismissNote() {                          // Declare function
      document.body.removeChild(elNote);              // Remove the note
    }

    var elClose = document.getElementById('close');   // Get the close button
    elClose.addEventListener('click', dismissNote, false);// Click close-clear note
}

// $(document).ready(function() {
//     $('#register').on('click', function() {
//         counter++;
//         $('#cart-count').html('counter'); 
//     })
// });

// if user logged in - update cart
// if user not logged in - force the user to log in


// Create the HTML for the message
// var msg = '<div class=\"header\"><a id=\"close\" href="#"><h2 id="close">&#10005;<h2></a></div>';
// msg += '<div><h2>This Membership Webpage is Currently Under Construction</h2>';
// msg += 'we are in the process of updating sign&ndash;up and sing&ndash;in functionality!<br/>';
// msg += 'we recommend you to use your google account to join our membership :)<br/>thank you so much for your understanding <i class="fa fa-heart" id="heart" aria-hidden="true"></i></div>';

// var elNote = document.createElement('div');       // Create a new element
// elNote.setAttribute('id', 'note');                // Add an id of note
// elNote.innerHTML = msg;                           // Add the message
// document.body.appendChild(elNote);                // Add it to the page

// function dismissNote() {                          // Declare function
//   document.body.removeChild(elNote);              // Remove the note
// }

// var elClose = document.getElementById('close');   // Get the close button
// elClose.addEventListener('click', dismissNote, false);// Click close-clear note


$(".box1-2").hide();
$('button').on('click', function () {
    $(".box1-2").show();
    var classname = $(this).parent('#classdesc').find("#classname").eq(0);
    var nameclone = classname.clone()
        .css({
            'font-size':'15px',
            'display': 'block',
            'text-align': 'center',
            'margin': '10px',
        }).appendTo($('#registeration'));
    /*$("#registerclass").append('<br/>' + nameclone.text());*/
});