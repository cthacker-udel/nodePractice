const EventEmitter = require('events');

var url = 'http://mylogger.io/log';

class Logger extends EventEmitter {

    log(msg){
        this.emit('messageLogged',{data: msg});
    }

}

module.exports = Logger