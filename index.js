const express = require('express');

const userRouter = require('./routes/user.route');

const port = 7000;

const app = express();
app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('public'))

app.get('/', (req, res) => res.render('index', {
    name: 'New World'
    })
)

app.use('/users', userRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})