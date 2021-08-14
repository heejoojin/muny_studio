
window.onload = function() {
    if (firebase.auth().currentUser) {
        var user = firebase.auth().currentUser;
        $('#welcome').html('welcome ' + user.displayName + ' !');
    }
    // var msg = '<% include ../helpers/product_in_cart %> ';
};