const express = require("express");

const router = express.Router();

const authMiddleware=require("../middleware/authMiddleware");

const roleMiddleware=require("../middleware/roleMiddleware");

const{
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
}=require("../controllers/categoryController");

router.get("/",getCategories);

router.post(
    "/",
    authMiddleware,
    roleMiddleware("superadmin","editor"),
    createCategory
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("superadmin","editor"),
    updateCategory
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("superadmin"),
    deleteCategory
);

module.exports=router;