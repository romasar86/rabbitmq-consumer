const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const eventsSchema = new Schema({
    email: {
        type: "String",
        required: true
    },
    event: {
        type: "String",
        required: true
    },
    timestamp: {
        type: "Number",
        required: true
    }
}, {
    collection: "events"
});

module.exports = mongoose.model("Events", eventsSchema);