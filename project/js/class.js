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

    var local_cart_count = 0;
    if (firebase.auth().currentUser) {
        var user = firebase.auth().currentUser;
        var userdb = firebase.database().ref('user/' + user.displayName);

        // /user.displayName);

        userdb.on('value', (snapshot)=> {
        // firebase.database().ref().child('user').child(user.displayName).get().then((snapshot) => {
            // count = snapshot.val().username
            if (snapshot.exists()) {
                local_cart_count = snapshot.val().cart_count;
            } else {
                userdb.push();

                firebase.database().ref('user/' + user.displayName).set({
                    email: user.email,
                    cart_count: 0
                });
            }
        });
        
        local_cart_count++;
        // userdb.update({
        //     cart_count: local_cart_count
        // });

        $('#cart').html('<i class="fa fa-shopping-cart"></i>&nbsp;' + local_cart_count);
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