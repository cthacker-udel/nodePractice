    const config = require('config');
    const express = require('express');
    const app = express();
    const logger = require('./middleware/logger');
    const authenticator = require('./middleware/authenticator');
    const morgan = require('morgan');
    const coursesRouter = require('./routes/courses');
    const homepageRouter = require('./routes/homepage');
    const startupDebugger = require('debug')('app:startup');
    const databaseDebugger = require('debug')('app:db');

    app.set('view engine','pug');
    app.set('views','./views'); // default

    app.use(express.json());
    app.use(express.urlencoded({extended: true})); //parses incoming requests into url encoded payloads, such as key=value&key=value
    app.use(express.static('public'));
    app.use(logger);
    app.use(authenticator);
    app.use('/api/courses',coursesRouter);
    app.use('/',homepageRouter);
    // Configuration
    if(app.get('env') === 'development'){
        app.use(morgan('tiny'));
        startupDebugger('Morgan enabled...');
    }
    databaseDebugger('Connected to database...');
    // PORT
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening on port ${port}...`));