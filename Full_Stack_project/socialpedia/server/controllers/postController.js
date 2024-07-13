
import Users from '../models/userModel.js';
import Posts from './../models/postModel.js';
import Comments from './../models/commentModel.js';
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
 
export const getPosts = async (req, res, next) => { 
  try {
    // get user id
    const { userId } = req.body.user;

    // get search data
    const { search } = req.body;

    // find user
    const user = await Users.findById(userId);

    // get friends
    const friends = user?.friends?.toString().split(",") ?? [];
    friends.push(userId); // add user id to friends

    // get search query
    const searchPostQuery = {
      $or: [ // or condition
        {
          description: { $regex: search, $options: "i" }, // case insensitive regex
        },
      ],
    };

    // get posts
    const posts = await Posts.find(search ? searchPostQuery : {}) // search query
      .populate({ // populate user
        path: "userId",
        select: "firstName lastName location profileUrl -password",
      })
      .sort({ _id: -1 }); // sort by id
    
    // get friends posts
    const friendsPosts = posts?.filter((post) => {
      return friends.includes(post?.userId?._id.toString());
    });

    // get other posts
    const otherPosts = posts?.filter(
      (post) => !friends.includes(post?.userId?._id.toString())
    );

    // create response
    let postsRes = null;

    // load friends posts first
    if (friendsPosts?.length > 0) {
      postsRes = search ? friendsPosts : [...friendsPosts, ...otherPosts];
    } else {
      postsRes = posts;
    }

    // send response
    res.status(200).json({
      success: true,
      message: "successfully",
      data: postsRes,
    });

  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res, next) => {

  try {
    // get post id
    const { id } = req.params;

    // get post
    const post = await Posts.findById(id).populate({ // populate user
      path: "userId",
      select: "firstName lastName location profileUrl -password",
    })
      .populate({ // populate comments
        path: "comments",
        populate: { // populate users
          path: "userId",
          select: "firstName lastName location profileUrl -password",
        },
        options: { // sort comments
          sort: "-_id",
        },
      })
      .populate({
        path: "comments",
        populate: { // populate replies
          path: "replies.userId",
          select: "firstName lastName location profileUrl -password",
        },
      });

    res.status(200).json({
      success: true,
      message: "successfully",
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getUserPost = async (req, res, next) => { 
  
  try {

    // get user id
    const { id } = req.params;

    // get posts
    const post = await Posts.find({ userId: id }) // search by user id
      .populate({ // populate user
        path: "userId",
        select: "firstName lastName location profileUrl -password",
      })
      .sort({ _id: -1 }); // sort by id
    

    // send response
    res.status(200).json({
      success: true,
      message: "successfully",
      data: post,
    });

  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getComments = async (req, res, next) => { 

  try {

    // get post id
    const { postId } = req.params;

    // get comments
    const postComments = await Comments.find({ postId })
      .populate({ // populate user
        path: "userId",
        select: "firstName lastName location profileUrl -password",
      })
      .populate({ // populate replies
        path: "replies.userId",
        select: "firstName lastName location profileUrl -password",
      })
      .sort({ _id: -1 }); // sort by id
    

    // send response
    res.status(200).json({
      success: true,
      message: "successfully",
      data: postComments,
    });

  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const likePost = async (req, res, next) => { 
  try {

    // get user id
    const { userId } = req.body.user;

    // get post id
    const { id } = req.params;

    // get post
    const post = await Posts.findById(id);

    // get index
    const index = post.likes.findIndex((pid) => pid === String(userId));

    if (index === -1) { // if not liked
      post.likes.push(userId);
    } else { // if liked
      post.likes = post.likes.filter((pid) => pid !== String(userId));
    }

    // update post
    const newPost = await Posts.findByIdAndUpdate(id, post, {
      new: true,
    });

    // send response
    res.status(200).json({
      success: true,
      message: "successfully",
      data: newPost,
    });

  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};