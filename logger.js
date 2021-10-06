const EventEmitter = require('events');

var url = 'http://mylogger.io/log';

class Logger extends EventEmitter {

    log(msg){
        this.emit('messageLogged',{data: msg});
    }

}

module.exports = Logger

let obj = {};

let newObj = {id: 10, 'name': 'Object'};

const cloneObj = {...newObj};

console.log(JSON.stringify(cloneObj));