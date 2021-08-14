
window.onload = function() {
    if (firebase.auth().currentUser) {
        var user = firebase.auth().currentUser;
        var userdb = firebase.database().ref('user/' + user.displayName);
        $('#welcome').html('welcome ' + user.displayName + ' !');

        userdb.on('value', (snapshot)=> {
            var userval = snapshot.val();
            for (let i = 1; i <= 3; i++) {
                for (let j = 1; i <= userval[i]; j++) {
                    // var msg = '<% include ../helpers/product_in_cart %> ';
                    $('.product').html('<% include ../helpers/product_in_cart %>');
                }
            }
        });
    }
};