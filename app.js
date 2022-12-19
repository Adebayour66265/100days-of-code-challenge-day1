const express = require('express');
const path = require('path');

const authRoutes = require('./routes/authRoutes');

const routes = require('./routes/authRoutes');

const app = express();

app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));


app.use('/api/', authRoutes);

app.use('/signup', (req, res) => {
    const html = path.join(__dirname, 'public', 'html', 'index.html');
    res.status(200).sendFile(html);
});
app.use('/login', (req, res) => {
    const html = path.join(__dirname, 'public', 'html', 'login.html');
    res.status(200).sendFile(html);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App is Listing to PORT = ${PORT}`);
})