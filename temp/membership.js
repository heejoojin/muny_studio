function checkUsername() {                            // Declare function
    var elMsg = document.getElementById('warning'); // Get feedback element
    if (this.value.length < 6) {                     // If username too short
      elMsg.innerHTML = '<p><i class="fas fa-exclamation-triangle"></i> your username must be 6 characters or more</p>';
      /*var submit = document.getElementById('signupbtt');*/
    } else {                                         // Otherwise
      elMsg.innerHTML = '';                             // Clear message
    }
  }
  var elUsername = document.getElementById('usernameinput'); // Get username input
  elUsername.onblur = checkUsername;// when it loses focus call cehckuserName();

/*function disablesubmit() {
    var login = document.getElementById('signup');
    var password = document.getElementById('password');
    var submit = document.getElementById('signupbtt');
    var submitted = false;
    if (this.value.length < 6)
}*/

/*(function(){
  var form      = document.getElementById('newPwd');  // The form
  var password  = document.getElementById('pwd');     // Password input
  var submit    = document.getElementById('submit');  // Submit button

  var submitted = false;                            // Has form been submitted?
  submit.disabled = true;                           // Disable submit button
  submit.className = 'disabled';                    // Style submit button
  console.log(submit.className);
  
  // On input: Check whether or not to enable the submit button
  addEvent(password, 'input', function(e) {         // On input of password
    var target = e.target || e.srcElement;          // Target of event
    submit.disabled = submitted || !target.value;   // Set disabled property
    // If form has been submitted or pwd has no value set CSS to disabled
    submit.className = (submitted || !target.value) ? 'disabled' : 'enabled';
  }); 

  // On submit: Disable the form so it cannot be submitted again
  addEvent(form, 'submit', function(e) {            // On submit
    if (submit.disabled || submitted) {             // If disabled OR sent
      e.preventDefault();                           // Stop form submitting
      return;                                       // Stop processing function
    }                                               // Otherwise continue...
    submit.disabled = true;                         // Disable submit button
    submitted = true;                               // Update submitted var
    submit.className = 'disabled';                  // Update style

    // Demo purposes only: What would have been sent & show submit is disabled
    e.preventDefault();                             // Stop form submitting
    alert('Password is ' + password.value);         // Show the text
  });
}());*/


var el = 0;
var username;
function toggleLogIn() {
    if (el == 0) {
        $('#question').hide();
        $('#google').hide();
        $("#signupbtt").hide();
        $("#signin").html("Sign in");
        $('#username').html("Username");
        $('#password').html("Password");
        $('#title').html("sign in");
        el = 1;
    } else if (el == 1) {
        $('#signup').hide();
        $('#title').html("welcome to muni studio !");
        $("#signin").html("Sign out");
        el = 2;
    } else {
        el = 0;
        $('#signup').show();
        $('#question').show();
        $('#google').show();
        $("#signupbtt").show();
        $("#signin").html("Sign in");
        $('#username').html("Create Username");
        $('#password').html("Create Password");
        $('#title').html("become a member and join our clay community !");
    }
}

window.onload = function() {
    firebase.auth().onAuthStateChanged(function(user) {
        var google = document.getElementById('google');
      if (user) {
        $('#signup').hide();
        $('#question').hide();
        $('#signin').hide();
        $('#google').html("Sign out");
        $('#title').html("welcome to muni studio<br/>thank your joining our membership !");
        initializeStreamListener();
      } else {
        $('#signup').show();
        $('#question').show();
        $('#signin').show();
        $('#google').html('<i class="fab fa-google-plus"></i> Sign in with Google');

        $('#title').html("become a member and join our clay community !");
      }
      $('#google').attr("disabled", false);
    });
};