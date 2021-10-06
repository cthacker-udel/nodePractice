    const Joi = require('joi');
    const express = require('express');

    const app = express();

    app.use(express.json());

    const courses = [
        {id: 1, name: 'course1'},
        {id: 2, name: 'course2'},
        {id: 3, name: 'course3'}
    ];

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    app.get('/',(req,res) => {
        res.send('Hello World!!!!');
    });

    app.get('/api/courses',(req,res) => {
        res.send(courses);
    });

    app.get('/api/courses/:id',(req,res) => {
        const course = courses.find(e => e.id == parseInt(req.params.id));
        if(!course){
            res.status(404).send('Course unabled to be found with given id');
        }
        else{
            res.send(course);
        }
    });

    app.post('/api/courses',(req,res) => {
        
        const { error, value } = schema.validate(req.body);

        //console.log(error);
        //console.log(value);

        if(error){
            res.send(error.details[0].message);
            return;
        }

        const course = {
            id: courses.length + 1,
            name: req.body.name
        };
        courses.push(course);
        res.send(course);
    });

    app.put('/api/courses/:id', (req,res) => {
        // lookup course
        const course = courses.find(e => e.id === parseInt(res.params.id));
        if(!course){
            res.status(404).send('Cannot find course');
            return;
        }

        const { error, value } = schema.validate(req.body);

        if(error){
            res.status(400).send(error.details);
            return;
        }

        course.name = req.body.name;
        res.send(course);

    });

    // PORT

    const port = process.env.PORT || 3000;

    app.listen(port, () => console.log(`Listening on port ${port}...`));


    /*
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
