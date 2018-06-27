const Amqp = require("./amqp"),
    config = require("./config"),
    Events = require("./models/events"),
    db = require("./db");

class Consumer {
    static consume() {
        const amqp = new Amqp(config.queue);
        return db.connect()
            .then(amqp.consume.bind(amqp, Consumer.worker));
    }

    static worker(msg) {
        const data = JSON.parse(msg.content.toString()),
            events = new Events(data);
        return events.save();
    }
}

module.exports = Consumer;
