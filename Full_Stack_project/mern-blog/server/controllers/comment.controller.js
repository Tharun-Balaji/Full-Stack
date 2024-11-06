import { errorHandler } from '../utils/error.js';
import Comment from '../models/comment.model.js';


/**
 * @description Creates a new comment for a post
 * @param {Object} req.body - Must contain content, postId, and userId
 * @param {string} req.body.content - Content of the comment
 * @param {string} req.body.postId - ObjectId of the post for which the comment is being created
 * @param {string} req.body.userId - ObjectId of the user who is creating the comment
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    // Check if the user is allowed to create this comment
    if (userId !== req.user.id) {
      return next(
        errorHandler(403, 'You are not allowed to create this comment')
      );
    }

    // Create the comment
    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();

    // Return the comment
    res.status(200).json(newComment);
  } catch (error) {
    // Handle any errors
    next(error);
  }
};
