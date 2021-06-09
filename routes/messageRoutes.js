const router = require("express").Router();
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Conversation = require("../models/convoModel");
const auth = require("../middleware/auth");

// Send a message
router.post("/", auth, async (req, res) => {
    try {

        const { body, toUser, fromUser } = req.body;
        const toId = await User.findOne({ username: toUser });

        const newMessage = new Message({ body: body, toId: toId._id, fromId: req.user, toUser: toUser, fromUser: fromUser });

        const savedMessage = await newMessage.save();
        res.json(savedMessage);

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

// Start a Conversation
router.post("/convo", auth, async (req, res) => {
    try {

        // Grab data from body
        const { user1, user2, user1Id } = req.body;

        // Validation
        const userExists1 = await User.findOne({ username: user1 });
        const userExists2 = await User.findOne({ username: user2 });
        if (!userExists1 || !userExists2) {
            return res.status(400).send("One or more of the users does not exist.");
        }
        if (user1 === user2) {
            return res.status(400).send("You can't start a convo with yourself.");
        }
        const existingConvo1 = await Conversation.findOne({ user1, user2 });
        const existingConvo2 = await Conversation.findOne({ user1: user2, user2: user1 });
        if (existingConvo1 || existingConvo2) {
            return res.status(400).send("This conversation already exists.");
        }

        // Save the new conversation
        const user2Id = await User.findOne({ username: user2 });
        const newConvo = new Conversation({ user1: user1, user2: user2, user1Id: user1Id, user2Id: user2Id._id, messageCount: 0 });
        const newConvo2 = new Conversation({ user1: user2, user2: user1, user1Id: user2Id._id, user2Id: user1Id, messageCount: 0 });
        const savedConvo = await newConvo.save();
        const savedConvo2 = await newConvo2.save();
        const convos = [savedConvo, savedConvo2];

        res.json(convos);

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

// Get One Conversation Data
router.get("/convo/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;

        const convo = await Conversation.findById(id);
        res.json(convo);

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

// Get All Conversations for a User
router.get("/convos/:id", auth, async (req, res) => {
    try {

        const { id } = req.params;
        const convo = await Conversation.find({ user1Id: id });

        return res.json(convo);

    } catch (err) {
        console.error(err);
        res.status(500).send("something went wrong");
    }
});

// Sent Messages
router.get("/sent", auth, async (req, res) => {
    try {

        const sent = await Message.find({ fromId: req.user }).sort({ date: "desc" });
        res.json(sent);

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

// Received Messages
router.get("/received", auth, async (req, res) => {
    try {

        const received = await Message.find({ toId: req.user }).sort({ date: "desc" });
        res.json(received);

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

module.exports = router;