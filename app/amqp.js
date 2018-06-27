const amqp = require("amqplib");

let channel = null;

class Amqp {
    constructor(options) {
        this.options = options;
    }

    get channel() {
        return channel;
    }

    set channel(ch) {
        channel = ch;
    }

    createConnection() {
        return amqp.connect(`amqp://${this.options.host}:${this.options.port}`);
    }

    createChannel(connection) {
        return connection.createChannel();
    }

    storeChannel(ch) {
        return this.channel = ch;
    }

    connect() {
        if(this.channel) return Promise.resolve(this.channel);
        return this.createConnection()
            .then(this.createChannel.bind(this))
            .then(this.storeChannel.bind(this));
    }

    consume(worker) {
        return this.connect().then(ch => {
            return ch.consume(this.options.queueName, (msg) => {
                if(msg) {
                    worker(msg)
                        .then(() => {
                            console.log("Message was processed");
                            return ch.ack(msg);
                        })
                        .catch( err => {
                            console.log(err, msg);
                        });
                }
            }, {noAck: false});
        });
    }
}

module.exports = Amqp;