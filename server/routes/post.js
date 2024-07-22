const express = require("express");
const router = express.Router();
const postController = require("../controller/postController")
const verifyToken= require("../middlewares/veifyToken");

router.post("/create", verifyToken, postController.createPost);
router.get("/story/:id", postController.getPostById);
router.get("/all", postController.getAllPosts);
router.put("/update/:id", verifyToken, postController.updatePostById);
router.delete(
  "/delete/:id",
  verifyToken,
  verifyToken,
  postController.deletePost
);
module.exports = router;