const router = require("express").Router();
const Message = require("../models/messageModel");
const auth = require("../middleware/auth");

// Send a message
router.post("/", auth, async (req, res) => {
    try {

        const { body, toId } = req.body;
        const newMessage = new Message({ body: body, toId: toId, fromId: req.user });

        const savedMessage = await newMessage.save();
        res.json(savedMessage);

    } catch (err) {
        console.error(err);
        res.status(500).send();
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