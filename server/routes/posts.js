var express = require("express");
var router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const auth = require("../middleware/auth"); // only allows users that are signed up

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("this is showing up on posts");
});

router.post("/add-post", auth, function (req, res, next) {
  console.log("The new POST:", req.body);

  const postToCreate = new Post({
    image: req.body.image,
    title: req.body.title,
    // dont pass this thropugh the body, do it through the json token req.user.id
    creator: req.user.id,
  });

  Post.create(postToCreate)
    .then((results) => {
      console.log("These are the results", results);
      res.json(results);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.json(err);
    });
});

router.get("/all-posts", (req, res) => {
  Post.find()
    .populate("creator")
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.json({ error: err.message });
    });
});

router.get("/all-posts-by-user/:userId", (req, res) => {
  Post.find({ creator: req.params.userId })
    .then((results) => {
      console.log("ALL Posts from this user", results);
      res.json(results);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.json(err);
    });
});

router.get("/all-posts/find-by-id/:postId", (req, res) => {
  Post.findById(req.params.postId)
    .populate("creator")
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.json({ error: err.message });
    });
});

router.post("/delete-post/:postId", auth, function (req, res, next) {
  console.log("Delete One POST:", req.body);

  Post.findByIdAndRemove(req.params.postId)
    .then((results) => {
      console.log("Post was deleted", results);
      res.json(results);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.json(err);
    });
});

router.post("/delete-all-posts", auth, function (req, res, next) {
  console.log("Delete ALL POSTS:", req.body);

  Post.deleteMany({ creator: req.user.id })
    .then((results) => {
      console.log("ALL Posts were deleted", results);
      res.json(results);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.json(err);
    });
});

//updates the post title property -- however I think that any logged in user can modify it
//need to figure out a way of only allowing the creator to modify the post
// router.post("/update-post", auth, function (req, res, next) {
//   console.log("update One POST:", req.body);

//   Post.findByIdAndUpdate("61b217d0bf02ea1df8bd670e", { title: "NYC" })
//     .then((results) => {
//       console.log("Post was updated", results);
//       res.json(results);
//     })
//     .catch((err) => {
//       console.log("Something went wrong", err);
//       res.json(err);
//     });
// });

// test something from above - if statment to have the update post only be availab by the creator
router.post("/update-post/:postId", auth, function (req, res, next) {
  console.log("update One POST:", req.body);

  Post.findByIdAndUpdate(req.params.postId)
    .then((updatedPost) => {
      if (updatedPost.creator._id == req.user.id) {
        updatedPost.title = "Barcelona"; // dont think this part would be reusable if I put this in middleware
        updatedPost
          .save()
          .then((results) => {
            console.log("title was updated", results);
            res.json(results);
          })
          .catch((err) => {
            console.log("Something went wrong", err);
            res.json(err);
          });
      } else {
        console.log(req.user.id);
        res.json({ message: "You cannot update this" });
      }
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.json(err);
    });
});

//updates the votes property of the Post Schema by adding the user that voted into the votes array
//it also avoids the same user voting on the same thing multiple times
router.post("/votes-up/:postId", auth, function (req, res, next) {
  console.log("update One POST:", req.body); // on the front end, I will use the array lenght to display the vote count

  Post.findById(req.params.id)
    .then((foundPost) => {
      if (foundPost.votes.includes(req.user.id)) {
        res.json({ message: "You already voted this" });
      } else {
        foundPost.votes.push(req.user.id);
        // need another .then below because we are doing a new async funtion -- .save()
        foundPost
          .save()
          .then((results) => {
            console.log("Voted was counted", results);
            res.json(results);
          })
          .catch((err) => {
            console.log("Something went wrong", err);
            res.json(err);
          });
      }
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.json(err);
    });
});
router.get("/votes-up/:postId", auth, function (req, res, next) {
  Post.findById(req.params.postId)
    .then((foundPost) => {
      if (foundPost.votes.includes(req.user.id)) {
        res.json({ message: "You already voted this" });
      } else if (foundPost.creator == req.user.id) {
        res.json({ message: "You cannot vote on your own work" });
      } else {
        foundPost.votes.push(req.user.id);
        // need another .then below because we are doing a new async funtion -- .save()
        foundPost
          .save()
          .then((results) => {
            console.log("Voted was counted", results);
            res.json(results);
          })
          .catch((err) => {
            console.log("Something went wrong", err);
            res.json(err);
          });
      }
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      res.json(err);
    });
});

//deletes the user and all the posts associated with it
router.delete("/delete-user", auth, (req, res) => {
  console.log(req.user);
  Post.deleteMany({ creatorID: req.user.id })
    .then((results) => {
      console.log(results);
      User.findByIdAndDelete(req.user.id)
        .then((user) => {
          console.log(user);
          res.json({ message: "user deleted sucessfully" });
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
