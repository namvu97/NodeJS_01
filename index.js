require('dotenv').config();

const express = require('express');
var cookieParser = require('cookie-parser')

const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');

const authMiddleware = require('./middlewares/auth.middleware');

const port = 7000;

const app = express();
app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(express.static('public'))

app.get('/', (req, res) => res.render('index', {
    name: 'New World'
    })
)

app.use('/users', authMiddleware.requireAuth, userRoute)
app.use('/auth', authRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})