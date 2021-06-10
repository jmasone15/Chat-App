const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    user1: { type: String, required: true },
    user2: { type: String, required: true },
    messageCount: { type: Number, required: true },
});

const Conversation = mongoose.model("conversation", conversationSchema);
module.exports = Conversation;