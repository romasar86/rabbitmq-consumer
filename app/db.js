const mongoose = require("mongoose"),
    config = require("./config");

let client = null;

class Mongoose {
    static connect() {
        if(!client) {
            client = mongoose;
            const uri = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.db}`;
            return client.connect(uri);
        }
        return Promise.resolve(client);
    }
}

module.exports = Mongoose;