const express = require("express");
const router = express.Router();
const postController = require("../controller/postController")
const verifyToken= require("../middlewares/veifyToken");

router.post("/create", verifyToken, postController.createPost);
router.get("/post/:userName", postController.getPostByUser);
router.get("/post/:category", postController.getPostByCategory);
router.put("/update/:userName", verifyToken, postController.updatePostByUser);
router.get("/all", postController.getAllPosts);
module.exports = router;