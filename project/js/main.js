
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
      $('#google').html('<i class="fab fa-google-plus"></i> Sign out');
      $('#google').css('background-color','#ecdece');
      
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
                  class: {1: 0, 2: 0, 3: 0}
              });
              $('#cart').html('<i class="fa fa-shopping-cart"></i>');
          }
      });
      $('#cart').show();
      $('#cart').css('background-color','#ecdece');
      // initializeStreamListener();
    } else {
      $('#cart').hide();
      $('#google').html('<i class="fab fa-google-plus"></i> Sign in with Google');
      $('#google').css('background-color','#ecdece');
    }
    $('#google').attr("disabled", false);
  });
};
