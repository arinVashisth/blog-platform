const Contact = require("../models/Contact");

// Create Contact Message

const createContact = async (req, res) => {

    try {

        const contact = await Contact.create(req.body);

        res.status(201).json({

            message: "Message sent successfully.",

            contact,

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// Get All Messages

const getContacts = async (req, res) => {

    try {

        const contacts = await Contact.find()
            .sort({
                createdAt: -1,
            });

        res.json(contacts);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

const getUnreadCount = async (req, res) => {

    try {

        const count = await Contact.countDocuments({
            status: "unread",
        });

        res.json({
            unread: count,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

// Mark as Read

const markAsRead = async (req, res) => {

    try {

        const contact = await Contact.findByIdAndUpdate(

            req.params.id,

            {
                status: "read",
            },

            {
                new: true,
            }

        );

        res.json(contact);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// Delete Message

const deleteContact = async (req, res) => {

    try {

        await Contact.findByIdAndDelete(req.params.id);

        res.json({

            message: "Message Deleted",

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

module.exports = {

    createContact,

    getContacts,
    
    getUnreadCount,

    markAsRead,

    deleteContact,

};