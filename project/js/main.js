
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
    $('#google').html('<i class="fab fa-google-plus"></i> Sign out');
    $('#google').css('background-color','#ecdece');
    $('#cart').show();
    $('#cart').html('<i class="fa fa-shopping-cart"></i>');
    $('#cart').css('background-color','#ecdece');
  } else { // handle logout
    firebase.auth().signOut();
    $('#cart').hide();
    $('#google').html('<i class="fab fa-google-plus"></i> Sign in with Google');
    $('#google').css('background-color','#ecdece');
  }
  //This disables the button until login or logout is successful
  $('#google').attr("disabled", false);
}

// window.onload = function() {
//   firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       $('#google').html('<i class="fab fa-google-plus"></i> Sign out');
//       $('#google').css('background-color','#ecdece');
//       $('#cart').show();
//       $('#cart').html('<i class="fa fa-shopping-cart"></i>');
//       $('#cart').css('background-color','#ecdece');
//       initializeStreamListener();
//     } else {
//       $('#cart').hide();
//       $('#google').html('<i class="fab fa-google-plus"></i> Sign in with Google');
//       $('#google').css('background-color','#ecdece');
//     }
//     $('#google').attr("disabled", false);
//   });
// };
