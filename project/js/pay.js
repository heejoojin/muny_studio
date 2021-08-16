setTimeout(function() {
    paypal.Buttons({
        style: {
            layout: 'vertical',
            color:  'black',
            shape:  'pill',
            label:  'checkout',
            tagline: 'false',
        },
        createOrder: function (data, actions) {
            // var total_price = $('.total-product-price').text();
            // console.log(value);
            return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: 160.00
                  }
                }]
              });
        }
    }).render('#paypal-button');
}, 1000);



