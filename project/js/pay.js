paypal.Buttons({
    style: {
        layout: 'vertical',
        color:  'black',
        shape:  'pill',
        label:  'checkout',
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
$('#paypal-button').show();

