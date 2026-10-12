const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleWare");

const {
    createDairy,
    getDairy,
    getDairyById,
    updateDairy,
    deleteDairy
} = require("../controllers/dairyContoller.js");



router.post("/",protect,createDairy);
router.put("/:id",protect,updateDairy);
router.get("/users/:id",protect,getDairy);
router.get("/:id",protect,getDairyById);
router.delete("/:id",protect,deleteDairy);

module.exports = router;