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
            local_cart_count = snapshot.val().cart_count;
            local_class_count = snapshot.val().class[class_num];
        });
        
        local_cart_count++;
        local_class_count++;

        var new_userdb = {};
        newuserdb[cart_count] = local_cart_count;
        newuserdb['class'][class_num] = local_class_count;
        console.log(new_userdb);
        userdb.update(new_userdb);

        $('#cart').html('<i class="fa fa-shopping-cart"></i>&nbsp;' + local_cart_count);
    }
}
