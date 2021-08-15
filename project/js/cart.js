var local_cart_count = 0;
var local_class_count = 0;
var local_total_price = 0;

function removeFromCart(class_num, price) {
    if (firebase.auth().currentUser) {
        $('#product1-template').hide();
        $('#product2-template').hide();
        $('#product3-template').hide();

        var user = firebase.auth().currentUser;
        var userdb = firebase.database().ref('user/' + user.displayName);

        userdb.on('value', (snapshot)=> {
            local_cart_count = snapshot.val()['cart_count'];
            local_class_count = snapshot.val()[class_num];
            local_total_price = snapshot.val()['total_price'];
        });
        
        local_cart_count--;
        local_class_count--;
        local_total_price -= price;

        var new_userdb = {};
        new_userdb['cart_count'] = local_cart_count;
        new_userdb[class_num] = local_class_count;
        new_userdb['total_price'] = local_total_price;

        console.log(new_userdb);
        userdb.update(new_userdb);
        window.location.reload();
        
        // $('#cart').html('<i class="fa fa-shopping-cart"></i>&nbsp;' + local_cart_count);
    }
}