const Post = require("../models/post");

const createPost = async (req, res, next) => {
  try {
    const { heading, category, description, imageUrl, refUserId } = req.body;
    if (!heading || !category || !description || !imageUrl) {
      return res.status(400).json({
        errorMessage: "Bad request",
      });
    }
    const userName = req.userName;
    const userId = req.userId;

    const postDetails = new Post({
      heading,
      category,
      description,
      imageUrl,
      refUserId: userId,
    });

    await postDetails.save();
    res.json({ message: "Post created successfully" });
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const postDetails = await Post.find({ _id: id });

    if (!postDetails) {
      return res.status(400).json({
        errorMessage: "Bad request",
      });
    }

    res.json({ data: postDetails });
  } catch (error) {
    next(error);
  }
};

const updatePostById = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        errorMessage: "Bad Request",
      });
    }

    const isPostExists = await Post.findOne({ _id: id });

    if (!isPostExists) {
      return res.status(400).json({
        errorMessage: "Bad Request",
      });
    }

    const { heading, category, description, imageUrl } = req.body;

    if (!heading || !category || !description || !imageUrl) {
      return res.status(400).json({
        errorMessage: "Bad request",
      });
    }

    await Post.updateOne(
      { _id: id },
      {
        $set: {
          heading,
          category,
          description,
          imageUrl,
        },
      }
    );

    res.json({ message: "Post updated successfully" });
  } catch (error) {
    next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const category = req.query.category || "";
    let filter = {};

    const postList = await Post.find();
    res.json({ data: postList });
  } catch (error) {
    next(error);
  }
};
const deletePost = async (req, res, next) => {
  try {
    const id = req.params.id;

    const postDetails = await Post.findByIdAndDelete(id);

    if (!postDetails) {
      return res.status(400).json({
        errorMessage: "data not found",
      });
    }

    res.status(200).json({ message: "post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  getPostById,
  getAllPosts,
  updatePostById,
  deletePost,
};