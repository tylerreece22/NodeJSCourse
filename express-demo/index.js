const debug = require('debug')('app:startup');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const logger = require('./middleware/logger');
const courses = require('./routes/courses')
const home = require('./routes/courses')
const app = express();

// Adds templating engine
app.set('view engine', 'pug');
// Optional setting for folder where templates are located
app.set('views', './views');

app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(logger);
app.use('/api/courses', courses);
app.use('/', home);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled....')
}

// Db work..
debug('Connected to the database...');

// Configuration
debug(`Application name: ${config.get('name')}`)
debug(`Mail Server: ${config.get('mail.host')}`)
debug(`Mail password: ${config.get('mail.password')}`)

app.use((req, res, next) => {
    console.log('Authenticating...')
    next()
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
