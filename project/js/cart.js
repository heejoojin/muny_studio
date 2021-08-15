
function removeFromCart(class_num) {
    if (firebase.auth().currentUser) {
        var user = firebase.auth().currentUser;
        var userdb = firebase.database().ref('user/' + user.displayName);

        userdb.on('value', (snapshot)=> {
            local_cart_count = snapshot.val()['cart_count'];
            local_class_count = snapshot.val()[class_num];
        });
        
        local_cart_count--;
        local_class_count--;

        var new_userdb = {};
        new_userdb['cart_count'] = local_cart_count;
        new_userdb[class_num] = local_class_count;

        console.log(new_userdb);
        userdb.update(new_userdb);
        window.location.reload();
        
        // $('#cart').html('<i class="fa fa-shopping-cart"></i>&nbsp;' + local_cart_count);
    }
}