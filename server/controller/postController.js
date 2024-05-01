const Post = require("../models/post");

const createPost = async (req, res, next) => {
    try {
        const {
            heading,
            category,
            description,
            imageUrl,
            likeCount,
            isBookmarked,
            isSaved,
            isLiked,
            refUserId
        } = req.body;
        if (
            !heading || 
            !category || 
            !description ||
            !imageUrl
        ) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        const userId = req.userId;
        const postDetails = new Post({
            heading,
            category,
            description,
            imageUrl,
            likeCount:likeCount || 0,
            isBookmarked:false,
            isSaved:false,
            isLiked:false,
            refUserId:userId,
        });

        await postDetails.save();
        res.json({ message: "Post created successfully" });
    } catch (error) {
        next(error);
    }
};

const getPostByUser = async (req, res, next) => {
    try {
        const userName = req.params.userName;

        const postDetails = await Post.find(userName);

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

const getPostByCategory = async (req, res, next) => {
    try {
        const category = req.category;

        const postDetails = await Post.find(category);

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

const updatePostByUser = async (req, res, next) => {
    try {
        const userName = req.params.userName;
        const userId = req.userId;

        if (!userName) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        const isPostExists = await Post.findOne({ userName: userName, refUserId: userId });

        if (!isPostExists) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        const {
            heading,
            category,
            description,
            imageUrl,
            likeCount,
            isBookmarked,
            isSaved,
            isLiked,
            refUserId
        } = req.body;

        if (
            !heading || 
            !category || 
            !description ||
            !imageUrl 
        ) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        await Post.updateOne(
            { userName: userName, refUserId: userId },
            {
                $set: {
            heading,
            category,
            description,
            imageUrl,
            likeCount,
            isBookmarked,
            isSaved,
            isLiked                },
            }
        );

        res.json({ message: "post updated successfully" });
    } catch (error) {
        next(error);
    }
};

const getAllPosts = async (req, res, next) => {
    try {
        const category = req.query.category || "";
        let filter = {};

        const postList = await Post.find(
            {
                category: { $regex: category, $options: "i" },
                ...filter,
            }
        );
        res.json({ data: postList });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPost,
    getPostByUser,
    getPostByCategory,
    updatePostByUser,
    getAllPosts,
};