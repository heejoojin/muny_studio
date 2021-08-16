setTimeout(function() {
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
            var total_price = $('.total-product-price').text();
            console.log(value);
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



