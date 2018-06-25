const amqp = require("amqplib");

let channel = null;

class Amqp {
    constructor(options) {
        this.options = options;
    }

    connect() {
        if(channel) return Promise.resolve(channel);
        return amqp.connect(`amqp://${this.options.host}:${this.options.port}`)
            .then(connection => connection.createChannel())
            .then(ch => {
                ch.assertQueue(this.options.queueName, { durable: false });
                channel = ch;
                return channel;
            });
    }

    consume(worker) {
        return this.connect().then(ch => {
            return ch.consume(this.options.queueName, (msg) => {
                if(msg) {
                    worker(msg)
                        .then(() => ch.ack(msg))
                        .catch( err => {
                            console.log(err);
                        });
                }
            }, {noAck: false});
        });
    }

}

module.exports = Amqp;