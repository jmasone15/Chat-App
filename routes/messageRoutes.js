const router = require("express").Router();
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Conversation = require("../models/convoModel");
const auth = require("../middleware/auth");

// Send a message
router.post("/", auth, async (req, res) => {
    try {

        const { body, fromUser, convoId } = req.body;

        const newMessage = new Message({ convoId, body, fromUser });
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
        const { user1, user2 } = req.body;

        // Validation
        const userExists = await User.findOne({ username: user1 });
        const userExists2 = await User.findOne({ username: user2 });
        if (!userExists || !userExists2) {
            return res.status(400).send("One or more of the users does not exist.");
        }
        if (user1 === user2) {
            return res.status(400).send("You can't start a convo with yourself.");
        }
        const existingConvo = await Conversation.findOne({ user1, user2 });
        const existingConvo2 = await Conversation.findOne({ user1: user2, user2: user1 });
        if (existingConvo || existingConvo2) {
            return res.status(400).send("This conversation already exists.");
        }

        // Save the new conversation
        const newConvo = new Conversation({ user1: user1, user2: user2, messageCount: 0 });
        const savedConvo = await newConvo.save();

        res.json(savedConvo);

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.put("/convo/count", auth, async (req, res) => {
    try {
        const { convoId } = req.body;

        const currentCount = await Conversation.findById(convoId);
        const newCount = currentCount.messageCount + 1;
        await Conversation.findByIdAndUpdate(convoId, { messageCount: newCount });

        res.send(`Successfully updated count to ${newCount}`)
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
})

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
router.get("/convos/:user", auth, async (req, res) => {
    try {

        const { user } = req.params;
        const convo = await Conversation.find({ user1: user });
        const convo2 = await Conversation.find({ user2: user });

        if (convo.length !== 0 && convo2.length === 0) {
            return res.json(convo);
        } else if (convo.length === 0 && convo2.length !== 0) {
            return res.json(convo2);
        } else if (convo.length !== 0 && convo2.length !== 0) {
            const convoArray = [];
            for (let i = 0; i < convo.length; i++) {
                convoArray.push(convo[i]);
            }
            for (let i = 0; i < convo2.length; i++) {
                convoArray.push(convo2[i]);
            }
            return res.json(convoArray);
        };

    } catch (err) {
        console.error(err);
        res.status(500).send("something went wrong");
    }
});

// Get Conversation Messages
router.get("/:convoId", auth, async (req, res) => {
    try {

        const { convoId } = req.params;
        const messages = await Message.find({ convoId });

        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

module.exports = router;