    const path = require('path');
    const logModule = require('./logger');
    const os = require('os');
    const fs = require('fs');
    const http = require('http');

    const server = http.createServer((req,res) => {
        if (req.url === '/'){
            res.write('Hello World');
            res.end();
        }

        if (req.url === '/api/courses') {
            res.write(JSON.stringify([1,2,3]));
            res.end();
        }
    });

    //server.on('connection',(socket) => {
    //    console.log('new connection');
    //});

    server.listen(3000);


    console.log('Listening on port 3000...');

    /*
    const logger = new logModule();

    logger.on('messageLogged', (arg) => {
        console.log(arg);
    });

    logger.log('hello there');

    
    emitter.on('Message logged', (e) => {
        console.log(e);
    });

    // raised an event
    emitter.emit('Message logged', {id: 1, url: 'http://'});

    emitter.on('logging', (e) => {
        console.log(e);
    })

    emitter.emit('logging',{data: 'message'});

    console.log(`Total Memory: ${os.totalmem()}`);
    console.log(`Free Memory : ${os.freemem()}`);

    //console.log(fs.readdirSync('./'));

    

    fs.readdir('./', (err, result) => {
        if (err) {
            console.log('Error', err);
        } else {
            console.log(result);
        }
    });

    const pathObj = path.parse(__filename);

    console.log(pathObj);

    function runFunc(){
        console.log('hello');
    }

    var message = '';
    //console.log(global.message);

    var sayHello = () => console.log('hello');
    //sayHello();

    //console.log(module);
    //console.log(JSON.stringify(module.paths));

    //logModule(logModule);

    module.exports.func = () => console.log('this is a function');

    exports.func2 = () => console.log('this is function 2');

    //console.log(__filename);
    //console.log(__dirname);
    */
