const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {

    createContact,

    getContacts,

    getUnreadCount,

    markAsRead,

    deleteContact,

} = require("../controllers/contactController");

// Public

router.post(
    "/",
    createContact
);

// Super Admin

router.get(
    "/",
    authMiddleware,
    roleMiddleware("superadmin"),
    getContacts
);

router.get(
    "/unread-count",
    authMiddleware,
    roleMiddleware("superadmin"),
    getUnreadCount
);

router.put(
    "/:id/read",
    authMiddleware,
    roleMiddleware("superadmin"),
    markAsRead
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("superadmin"),
    deleteContact
);

module.exports = router;