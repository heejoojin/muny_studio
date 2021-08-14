var hasPopped = false;
var local_cart_count = 0;
var local_class_count = 0;

function addToCart(class_num) {
    
    if (!firebase.auth().currentUser && !hasPopped) {
        hasPopped = true;

        var msg = '<div id="popup-head"><a id="popup-close" href=""><h2>&#10005;<h2></a></div>';
        msg += '<div><h2>Google log-in is required for class registeration!</h2>';
        
        var popup = document.createElement('div'); // create a new element
        popup.setAttribute('class', 'popup'); // add a class name to the popup
        popup.innerHTML = msg; // add the message
        document.body.appendChild(popup); // add it to the page

        function closePopup() {  // declare function
          document.body.removeChild(popup); // remove the popup
          hasPopped = false;
        }

        var close = document.getElementById('popup-close'); // get the close button
        close.addEventListener('click', closePopup, false); // click close-clear popup
    }

    if (firebase.auth().currentUser) {
        
        var user = firebase.auth().currentUser;
        var userdb = firebase.database().ref('user/' + user.displayName);

        userdb.on('value', (snapshot)=> {
            local_cart_count = snapshot.val()['cart_count'];
            local_class_count = snapshot.val()[class_num];
        });
        
        local_cart_count++;
        local_class_count++;

        var new_userdb = {};
        new_userdb['cart_count'] = local_cart_count;
        new_userdb[class_num] = local_class_count;

        console.log(new_userdb);
        userdb.update(new_userdb);

        $('#cart').html('<i class="fa fa-shopping-cart"></i>&nbsp;' + local_cart_count);
    }
}
