const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get('*', (req, res) => {
    console.log('New user detected');
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, error => {
    if (error) throw error;
    console.log(`Server started! Listening on port ${port}`);
});

app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };

    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).send({ error: stripeErr });
        }
        else {
            res.status(200).send({ success: stripeRes });
        }
    });
});


