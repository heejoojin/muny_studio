var user = firebase.auth().currentUser;
var total_price = firebase.database().ref('user/' + user.displayName);

setTimeout(function() {
    paypal.Buttons({
        style: {
            layout: 'vertical',
            color:  'black',
            shape:  'pill',
            label:  'checkout',
            tagline: 'false'
        },
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: total_price
                  }
                }]
              });
        }
    }).render('#paypal-button');
}, 1000);



