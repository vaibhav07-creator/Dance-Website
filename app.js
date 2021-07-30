const express = require('express')
const path = require('path')
const fs = require('fs');
const app = express();
const port = 8000;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactdance', { useNewUrlParser: true, useUnifiedTopology: true });

const ContactSchema = new mongoose.Schema({
    Name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
const Contact = mongoose.model('contact', ContactSchema);

app.use(express.static('static'))
app.use(express.urlencoded())

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send('This item has been saved to the database')
    }).catch(() => {
        res.status(400).send('item was not saved to the databse')
    });
});
app.listen(port, () =>{
    console.log(`the application sucessfully on port ${port}`);
})