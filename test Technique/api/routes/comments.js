const router = require("express").Router();
const Comments= require("../models/Comments");
const User = require("../models/Users");

//create a Comment

router.post("/", async (req, res) => {
  const newComment = new Comments(req.body);
  try {
    const savedcomment = await newComment.save();
    res.status(200).json(savedcomment);
  } catch (err) {
    res.status(500).json(err);
  }
});
//update a Comment

router.put("/:id", async (req, res) => {
  try {
    const comment = await Comments.findById(req.params.id);
    if (comment.Author === req.body.Author) {
      await comment.updateOne({ $set: req.body });
      res.status(200).json("the comment has been updated");
    } else {
      res.status(403).json("you can update only your comment");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a Comment

router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comments.findById(req.params.id);
    if (comment.Auth === req.body.Author) {
      await comment.deleteOne();
      res.status(200).json("the comment has been deleted");
    } else {
      res.status(403).json("you can delete only yourcomment");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//like / dislike a comment

router.put("/:id/like", async (req, res) => {
  try {
    const comment = await Comments.findById(req.params.id);
    if (!comment.likes.includes(req.body.firstName)) {
      await comment.updateOne({ $push: { likes: req.body.firstName } });
      res.status(200).json("The comment has been liked");
    } else {
      await comment.updateOne({ $pull: { likes: req.body.firstName } });
      res.status(200).json("The comment has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// dislikes
router.put("/:id/dislike", async (req, res) => {
  try {
    const comment = await Comments.findById(req.params.id);
    if (!comment.dislikes.includes(req.body.firstName)) {
      await comment.updateOne({ $push: { dislikes: req.body.firstName } });
      res.status(200).json("The comment has been disliked");
    } else {
      await comment.updateOne({ $pull: { likes: req.body.firstName } });
      res.status(200).json("The comment has been liked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//get a comment

router.get("/:id", async (req, res) => {
  try {
    const comment = await Comments.findById(req.params.id);
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
