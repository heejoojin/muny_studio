// // This function sets up a listener- '.on()' gets called automatically whenever something saved in '/stream/' changes.
// // It's main purpose is to iterate over the stream in the database and add each message to the page.
// function initializeStreamListener() {
//   const databaseStreamReference = firebase.database().ref('/stream/');

//   databaseStreamReference.on('value', function(snapshot) {
//     var messages = snapshot.val();
//     $('#stream').empty();

//     if (messages) {
//       Object.keys(messages).forEach(function (key) {
//         const message = messages[key];
        
//         $('#stream').append(`<div>${message.body}</div>`);
//       });
//     }
//   });
// }

// // This function gets called with the new message information.
// // It gets the user information and uses both to add the post to the database.
// function addMessage(body, title) {
//   var user = firebase.auth().currentUser;
//   var authorPic = user.photoURL;
//   var author = user.displayName;

//   var name = user.displayName;

//   var postData = {
//     author: author,
//     authorPic: authorPic,
//     title: title,
//     body: body
//   };

//   var newPostKey = firebase.database().ref().child('stream').push().key;
//   $('#account').html(name);
//   firebase.database().ref('/stream/' + newPostKey).set(postData);
// }

// // This gets called whenver the form is submitted (check out the index.ejs).
// // Uses jQuery to get the message info and passes it to 'addMessage to actually submit the info to firebase.
// function handleMessageFormSubmit() {
//   var body = $('#new-post-body').val();
//   var title = $('#new-post-title').val();
//   addMessage(body, title);
// }

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
      var name = user.displayName;
      $('#google').html('<i class="fab fa-google-plus"></i> Sign out');
      $('#google').css('background-color','#ecdece');
      $('#cart').show();
      $('#cart').html('<i class="fa fa-shopping-cart"></i>');
      $('#cart').css('background-color','#ecdece');
      initializeStreamListener();
    } else {
      $('#cart').hide();
      $('#google').html('<i class="fab fa-google-plus"></i> Sign in with Google');
      $('#google').css('background-color','#ecdece');
    }
    $('#google').attr("disabled", false);
  });
};

// function updateCart() {
//   firebase.database().ref('users/' + userId).set({
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }

// The main purpose of this function is to set up a listener (using firebase) for when the auth state changes.
// If a user isn't authenticated, we should not show the stream and prompt them to log in.
// If a use IS authenticated, we should load/show the stream and give them the option to log out.
// window.onload = function() {
//   firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       $('#stream').show();
//       $('#login-button').html("Log out");
//       initializeStreamListener();
//     } else {
//       $('#stream').hide();
//       $('#login-button').html("Log in with google");
//     }
//     $('#login-button').attr("disabled", false);
//   });
// };

/*https://deanhume.com/a-basic-guide-to-firebase-for-the-web/*/

/*
// Firebase Config
var config = {
  apiKey: "AIzaSyBUNJfWoMRc7Vs8Ml5Q-ZLkXj-zD6fgtW0",
  authDomain: "radiant-torch-3037.firebaseapp.com",
  databaseURL: "https://radiant-torch-3037.firebaseio.com",
  projectId: "radiant-torch-3037",
  storageBucket: "radiant-torch-3037.appspot.com",
  messagingSenderId: "419105606981"
};
firebase.initializeApp(config);

class App extends React.Component {
  render() {
    return (
      <div className="comments">
        <h2>Leave a comment below!</h2>
        <CommentForm />
        <CommentList />
        <footer>
          &#169; 2019 by <a target="blank" href="https://github.com/joshbivens">Josh Bivens</a>
        </footer>
      </div>
    )
  }
}

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      comment: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  formatTime() {
    const options = {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute:'2-digit'
    };
    let now = new Date().toLocaleString('en-US', options);
    return now;
  }
  escapeHTML(html) {
    // Thank you to Andreas Borgen for this bit:
    // https://codepen.io/Sphinxxxx/pen/wjzRKO?editors=0010
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
  }
  handleSubmit(e) {
    e.preventDefault();
    
    const user = {
      username: this.state.username,
      comment: this.escapeHTML(this.state.comment),
      time: this.formatTime(),
    }
    
    const db = firebase.database().ref('comments');
    db.push(user);
    
    this.setState({
      username: '',
      comment: ''
    })
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    return (
      <div className="comments-form">
        <form onSubmit={this.handleSubmit}>
          <ul>
            <li>
              <input
                name="username"
                type="text" 
                placeholder="Name"  
                value={this.state.username}
                onChange={this.handleChange}
                required
               />
            </li>
            <li>
              <textarea
                name="comment"
                placeholder="Comment"
                value={this.state.comment}
                onChange={this.handleChange}
                required
              ></textarea>
            </li>
            <li><input type="submit" value="Post &#9998;" /></li>
          </ul>
        </form>
      </div>
    )
  }
}

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    }
  }
  componentWillMount() {
    // const db = firebase.database().ref('comments');
  }
  componentDidMount() {
    const db = firebase.database().ref('comments');
    
    db.on('value', (snapshot) => {
      const comments = snapshot.val();
      const arr = [];
      for(const comment in comments) {
        arr.push({
          username: comments[comment].username,
          comment: comments[comment].comment,
          time: comments[comment].time,
        })
      };
      
      this.setState({
        comments: arr.reverse()
      });
    })
  }
  render() {
    return (
      <div className="comments-list">
        {
          this.state.comments.map(comment => (
            <Comment
              username={comment.username}
              comment={comment.comment}
              time={comment.time}
            />                          
          ))
        }
      </div>
    )
  }
}

class Comment extends React.Component {
  render() {
    const { username, comment, time } = this.props;
    return (
      <div className="comment">
        <h4>{username} says</h4>
        <p className="timestamp">{time}</p>
        <p>{comment}</p>
      </div>
    )
  }
}

const mountNode = document.getElementById("app");
React.render(<App />, mountNode);*/