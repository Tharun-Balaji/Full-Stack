import { useState } from "react";
import { BiSolidLike, BiLike, BiComment } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md"
import { Link } from "react-router-dom";
import { CommentForm } from "../components";
import { NoProfile } from "../assets";
import moment from "moment";

export default function PostCard({ post, user, deletePost, likePost }) {
  const [showAll, setShowAll] = useState(0);
  const [showReply, setShowReply] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyComments, setReplyComments] = useState(0);
	const [showComments, setShowComments] = useState(0);
	
	const getComments = async () => { };

  return (
		<div className="mb-2 bg-primary p-4 rounded-xl">
			<div className="flex items-center gap-3 mb-2">
				<Link to={"/profile/".concat(post?.userId?._id)}>
					<img
						src={post?.userId?.profileUrl ?? NoProfile}
						alt={post?.userId?.firstName}
						className="w-14 h-14 object-cover rounded-full"
					/>
				</Link>
				<div className="w-full flex justify-between">
					<div className="">
						<Link to={"/profile/" + post?.userId?._id}>
							<p className="font-medium text-lg text-ascent-1">
								{post?.userId?.firstName}{" "}
								{post?.userId?.lastName}
							</p>
						</Link>
						<span className="text-ascent-2">
							{post?.userId?.location}
						</span>
					</div>

					<span className="text-ascent-2">
						{moment(post?.createdAt ?? new Date()).fromNow()}
					</span>
				</div>
			</div>
			<div>
				<p className="text-ascent-2">
					{showAll === post?._id
						? post?.description
						: post?.description.slice(0, 300)}

					{post?.description?.length > 301 &&
						(showAll === post?._id ? (
							<span
								className="text-blue ml-2 font-mediu cursor-pointer"
								onClick={() => setShowAll(0)}
							>
								Show Less
							</span>
						) : (
							<span
								className="text-blue ml-2 font-medium cursor-pointer"
								onClick={() => setShowAll(post?._id)}
							>
								Show More
							</span>
						))}
				</p>

				{post?.image && (
					<img
						src={post?.image}
						alt="post_image"
						className="w-full mt-2 rounded-lg"
					/>
				)}
			</div>
			<div className="mt-4 flex justify-between items-center px-3 py-2 text-ascent-1 text-base border-t border-[#66666645]">
				<p className="flex gap-2 items-center text-base cursor-pointer">
					{post?.likes?.includes(user?._id) ? (
						<BiSolidLike size={20} color="blue" />
					) : (
						<BiLike size={20} />
					)}
					{post?.likes?.length} Likes
				</p>

				<p
					className="flex gap-2 items-center text-base cursor-pointer"
					onClick={() => {
						setShowComments(
							showComments === post._id ? null : post._id
						);
						getComments(post?._id);
					}}
				>
					<BiComment size={20} />
					{post?.comments?.length} Comments
				</p>
				{user?._id === post?.userId?._id && (
					<div
						className="flex gap-1 items-center text-base text-ascent-1 cursor-pointer"
						onClick={() => deletePost(post?._id)}
					>
						<MdOutlineDeleteOutline size={20} />
						<span>Delete</span>
					</div>
				)}
			</div>

			{/* Comments */}
			{
				showComments === post?._id && (
					<div className="w-full mt-4 border-t border-[#66666645] pt-4">
						<CommentForm
							user={user}
							id={post?._id}
							getComments={()=>getComments(post?._id)}
						/>
					</div>
				)
			}

		</div>
  );
}
