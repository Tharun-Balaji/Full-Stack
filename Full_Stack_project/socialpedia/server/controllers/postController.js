
import Posts from './../models/postModel.js';
export const createPost = async (req, res, next) => {

  try {
    
    // get user id
    const { userId } = req.body.user;

    // get post data
    const { description, image } = req.body;

    // check for description
    if (!description) {
      next("You must provide a description");
      return;
    };

    // create post
    const post = await Posts.create({
      userId,
      description,
      image,
    });

    // send response
    res.status(200).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });

  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }

 };