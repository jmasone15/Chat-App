const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    convoId: { type: String, required: true },
    body: { type: String, required: true },
    fromUser: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Message = mongoose.model("message", messageSchema);
module.exports = Message;