var count = 0;
var hasPopped = false;

function addToCart() {
    
    if (!hasPopped && !firebase.auth().currentUser) {
        hasPopped = true;

        var msg = '<div id="popup-head"><a id="popup-close" href=""><h2>&#10005;<h2></a></div>';
        msg += '<div><h2>Google log-in is required for class registeration!</h2>';
        
        var popup = document.createElement('div');       // Create a new element
        popup.setAttribute('class', 'popup');                // Add an id of note
        popup.innerHTML = msg;                           // Add the message
        document.body.appendChild(popup);                // Add it to the page

        function closePopup() {                          // Declare function
          document.body.removeChild(popup);              // Remove the note
          hasPopped = false;
        }

        var close = document.getElementById('popup-close');   // Get the close button
        close.addEventListener('click', closePopup, false);// Click close-clear note
    }

    if (firebase.auth().currentUser) {
        var user = firebase.auth().currentUser;

        firebase.database().ref(user.email).child('cart_count').get().then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.val());
                count = snapshot.val();
            } else {
                // console.log("No data available");
                firebase.database().ref(user.email).set({
                    name: user.displayName,
                    cart_count: 1
                });
            }
        });

        count++;
        const dbref = firebase.database(user.email).ref().update({'cart_count': count});
        $('#cart').html('<i class="fa fa-shopping-cart"></i>&nbsp;' + dbref.child(user.email).child('cart_count').get());
    }
}

// $(document).ready(function() {
//     $('#register').on('click', function() {
//         counter++;
//         $('#cart-count').html('counter'); 
//     })
// });

// if user logged in - update cart
// if user not logged in - force the user to log in


// $(".box1-2").hide();
// $('button').on('click', function () {
//     $(".box1-2").show();
//     var classname = $(this).parent('#classdesc').find("#classname").eq(0);
//     var nameclone = classname.clone()
//         .css({
//             'font-size':'15px',
//             'display': 'block',
//             'text-align': 'center',
//             'margin': '10px',
//         }).appendTo($('#registeration'));
//     /*$("#registerclass").append('<br/>' + nameclone.text());*/
// });