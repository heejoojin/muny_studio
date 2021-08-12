var hasPopped = false;
var local_cart_count = 0;
var local_class_count = 0;

function addToCart(class_num) {
    
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
        var userdb = firebase.database().ref('user/' + user.displayName);

        userdb.on('value', (snapshot)=> {
            if (snapshot.exists()) {
                local_cart_count = snapshot.val().cart_count;
                local_class_count = snapshot.val().class[class_num];
            } else {
                userdb.push();
                userdb.set({
                    email: user.email,
                    cart_count: 0,
                    class: {1: 0, 2: 0, 3: 0}
                });
            }
        });
        
        local_cart_count++;
        local_class_count++;

        userdb.update({
            cart_count: local_cart_count,
            class: {class_num: local_class_count}
        });

        $('#cart').html('<i class="fa fa-shopping-cart"></i>&nbsp;' + local_cart_count);
    }
}
