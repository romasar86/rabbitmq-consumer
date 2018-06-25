const Amqp = require("./amqp"),
    config = require("./config");

class Consumer {
    static consume() {
        const amqp = new Amqp(config.queue);
        return amqp.consume(Consumer.worker);
    }

    static worker(msg) {
        console.log(msg.content.toString());
        return Promise.resolve();
    }
}

module.exports = Consumer;
