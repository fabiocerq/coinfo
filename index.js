const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const crfRoutes = require('./routes/crfRoutes')
const CrfController = require('./controllers/CrfController')

const cofRoutes = require('./routes/cofRoutes')
const CofController = require('./controllers/CofController')

const cpmRoutes = require('./routes/cpmRoutes')
const CpmController = require('./controllers/CpmController')

app.use(
    express.urlencoded({
        extended: true
    }),
)

app.use(express.json())

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use('/crf', crfRoutes)
app.use('/cof', cofRoutes)
app.use('/cpm', cpmRoutes)

app.use(express.static('public'));

app.get('/crf', CrfController.mainPage)
app.get('/cof', CofController.mainPage)
app.get('/cpm', CpmController.mainPage)

app.get('/', (req, res) => {
    res.render('home');
})

app.listen('3000', () => {
    console.log('Porta 3000 aberta.')
})