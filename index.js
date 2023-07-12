const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51NSZOXSH2fxkzzoXNuX3NCwoFrV5pCihfJwdODS5AzvuqFUKTg4UMjLNBUPD6dAok2NEFN0rqlluds531HCH6X7500GVNQVma2');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PUBLISHABLE_KEY = 'pk_test_51NSZOXSH2fxkzzoXblDkGzgRajQ4P1yDmzfQoGzSG3WX7JGriGtcQYw12v1mq4eUIidHUrhqIDWGlAoQR8b4OgQF00FNZnY1Ej';

app.get('/', (req, res) => {
  res.render('home', { key: PUBLISHABLE_KEY });
});

app.post('/payment', (req, res) => {
  stripe.paymentMethods.create({
    type: 'card',
    card: {
      token: req.body.stripeToken,
    },
  })
    .then((paymentMethod) => {
      return stripe.paymentIntents.create({
        amount: 7000,
        currency: 'INR',
        payment_method: paymentMethod.id,
        confirm: true,
      });
    })
    .then((paymentIntent) => {
      console.log(paymentIntent);
      res.send('success');
    })
    .catch((err) => {
      res.send(err);
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});


//const PUBLISHABLE_KEY = "pk_test_51NSZOXSH2fxkzzoXblDkGzgRajQ4P1yDmzfQoGzSG3WX7JGriGtcQYw12v1mq4eUIidHUrhqIDWGlAoQR8b4OgQF00FNZnY1Ej"
//const SECRET_KEY = "sk_test_51NSZOXSH2fxkzzoXNuX3NCwoFrV5pCihfJwdODS5AzvuqFUKTg4UMjLNBUPD6dAok2NEFN0rqlluds531HCH6X7500GVNQVma2" */