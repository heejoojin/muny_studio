
setTimeout(function() {
    paypal.Buttons({
        style: {
            layout: 'vertical',
            color:  'black',
            shape:  'pill',
            label:  'checkout',
            tagline: 'false',
            size: 'small'
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
            return actions.order.capture().then(function(detail) {
                console.log(detail);
                window.location.href = "/";
            });
        }
    }).render('#paypal-button');
}, 1000);



