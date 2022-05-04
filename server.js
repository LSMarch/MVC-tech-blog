const path = require('path');
const express = require('express');

// express-session
const session = require('express-session');
// express handlebars
const exphbs = require('express-handlebars');
// connect-session-sequelize, connect sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store)

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
    // configures express
    store: new SequelizeStore({
        db: sequelize,
    })
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

//console.log(sess)

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`))
})