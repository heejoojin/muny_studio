
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
                    value: $('#paypal-price').text()
                  }
                }]
              });
        }
    }).render('#paypal-button');
}, 1000);



