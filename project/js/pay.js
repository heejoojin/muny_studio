paypal.Buttons({
    style: {
        layout: 'vertical',
        color:  'black',
        shape:  'pill',
        label:  'paypal',
        tagline: 'false',
        size: 'medium'
    },
    createOrder: function (data, actions) {
        return actions.order.create({
            purchase_units: [{
              amount: {
                value: '160.00'
              }
            }]
          });
    }
}).render('#paypal-button');


