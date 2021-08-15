var config = {
  apiKey: 'AIzaSyCPMLCgfULPgsjvVLlQjrBR9-N47b4ktAA',
  authDomain: "database-30dcf.firebaseapp.com",
  databaseURL: "https://database-30dcf.firebaseio.com/",
  projectId: "database-30dcf",
  storageBucket: "database-30dcf.appspot.com",
  messagingSenderId: "7555310310"
};

firebase.initializeApp(config);

// Gets called whenever the user clicks "sign in" or "sign out".
function toggleSignIn() {
  if (!firebase.auth().currentUser) { // if no user, handle login
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      console.log("success");
    }).catch(function(error) {
      console.error("error", error);
    });
  } else { // handle logout
    firebase.auth().signOut();
  }
  //This disables the button until login or logout is successful
  $('#google').attr("disabled", false);
}

window.onload = function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      if ($('.popup')[0]){
        $('.popup').remove();
      }
      $('#google').html('<i class="fab fa-google-plus"></i> Sign out');
      $('#google').css('background-color','#ecdece');
      $('#cart').show();
      $('#cart').html('<i class="fa fa-shopping-cart"></i>');
      $('#cart').css('background-color','#ecdece');
      
      var user = firebase.auth().currentUser;
      var userdb = firebase.database().ref('user/' + user.displayName);

      userdb.on('value', (snapshot)=> {
          if (snapshot.exists() && snapshot.val().cart_count != 0) {
              $('#cart').html('<i class="fa fa-shopping-cart"></i>&nbsp;' + snapshot.val().cart_count);
          } else {
              userdb.push();
              userdb.set({
                  email: user.email,
                  cart_count: 0,
                  1: 0,
                  2: 0,
                  3: 0
              });
          }

          if ($('#product')[0]) {
            for (let i = 1; i <= 3; i++) {
                for (let j = 1; j <= snapshot.val()[i]; j++) {
                    // var msg = '<% include ../helpers/product_in_cart %> ';
                    var id = i;
                    id = 'product' + i; // convert i to a string

                    var product_div = document.getElementById('product');
                    var product = document.getElementById(id);

                    var newid = id + '-' + j
                    product.setAttribute('id', newid);
                    product_div.appendChild(product);

                    $('#' + newid).show();
                }
            }
          }
      });
      // initializeStreamListener();
      
    } else {
      $('#cart').hide();
      $('#google').html('<i class="fab fa-google-plus"></i> Sign in with Google');
      $('#google').css('background-color','#ecdece');
    }
    $('#google').attr("disabled", false);
  });
};
