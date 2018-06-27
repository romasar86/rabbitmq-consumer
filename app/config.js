module.exports = {
    name:"rabbitmq-consumer",
    queue: {
        host: "127.0.0.1",
        port: "5672",
        queueName: "events"
    },
    mongodb: {
        host: "127.0.0.1",
        port: "27017",
        db: "experimental"
    }
};