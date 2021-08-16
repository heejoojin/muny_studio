
setTimeout(function() {
    paypal.Buttons({
        style: {
            layout: 'vertical',
            color:  'black',
            shape:  'pill',
            label:  'checkout',
            tagline: 'false',
            size: 'responsive'
        },
        createOrder:function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: $('#paypal-price').text()
                  }
                }]
              });
        },
        onApprove:function(data, actions) {
            var user = firebase.auth().currentUser;
            var userdb = firebase.database().ref('user/' + user.displayName);
            // userdb.push();
            userdb.set({
                email: user.email,
                cart_count: 0,
                total_price: 0,
                1: 0,
                2: 0,
                3: 0
            });

            return actions.order.capture().then(function(detail) {
                console.log(detail);
                window.location.href = "/";
            });
        }
    }).render('#paypal-button');
}, 1000);



