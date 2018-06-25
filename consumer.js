const Consumer = require("./app/consumer"),
    config = require("./app/config");

console.log(config.name, "is started");
Consumer.consume()
    .catch( err => {
        console.log(err);
        process.exit(1);
    });