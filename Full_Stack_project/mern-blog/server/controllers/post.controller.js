import Post from '../models/post.model.js';
import { errorHandler } from '../utils/error.js';

export const create = async (req, res, next) => {

  if (!req.user.isAdmin) { // check if user is admin
    return next(errorHandler(403, 'You are not allowed to create a post'));
  }

  if (!req.body.title || !req.body.content) { // check if all fields are filled
    return next(errorHandler(400, 'Please fill all fields'));
  }

  const slug = req.body.title // create slug
    .split(' ') // split title
    .join('-') // join with -
    .toLowerCase() // convert to lowercase
    .replace(/[^a-zA-Z0-9]/g, '-');  // remove special characters

  const newPost = new Post({ // create new post
    ...req.body, // get data from req.body
    slug, // set slug
    userId: req.user.id // set user id
  });

  try {
    
    const savedPost = await newPost.save(); // save post

    res.status(201).json(savedPost); // return response

  } catch (error) {
    next(error); // return error
  }


};