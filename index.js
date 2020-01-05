const express = require('express')
const app = express()
const port = 3000

var bodyParser = require('body-parser')
var userRoute = require('./routes/user.route')
var authRoute = require('./routes/auth.route')
var authMiddleware = require('./middlewares/auth.middleware')

// cookie
var cookieParser = require('cookie-parser')
app.use(cookieParser())
    // cookie

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))

app.get('/', (req, res) => res.render('index', {
    name: "Kratos"
}))

app.use('/users', authMiddleware.requireAuth, userRoute); // route /user

app.use('/auth', authRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))