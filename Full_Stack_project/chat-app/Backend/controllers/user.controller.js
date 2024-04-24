import User from "../models/user.model.js";

export async function getUsersForSidebar(request, response) {
  try {
    const loggedInUserId = request.user._id;

    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    response.status(200).json({
      filteredUsers,
    });
  } catch (error) {
    console.log("Error in getUsersForSidebar: =>", error.message);
    response.status(500).json({
      error: "Internal Server Error",
    });
  }
}
