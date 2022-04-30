const path = require('path');
const express = require('express');

// express-session
const session = require('express-session');
const exphbs = require('express-handlebars');

const route = require('./controllers');
const sequelize = require('./config/connection')
const helpers = require('./utils/helper')

const app = express();
const PORT = process.env.PORT || 3001;

// sets up session
const sess = {
    secret: 'super duper secret',
    resave: false,
    saveUninitialized: true,
};

// use session
app.use(session(sess));


const hbs = exphbs.create({ helpers });

//use express-handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(route)

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`))
})