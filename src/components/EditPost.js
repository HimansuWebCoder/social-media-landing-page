import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";

function EditPost({id}) {

    const [ posts, setPosts ] = useState([]);

	const deletePost = (postId) => {
		try {
			axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
			setPosts(posts.filter((post) => post.id !== id));
		} catch (err) {
			console.log("Error", err);
		}
	}

	return (
		 <div className="absolute top-10 right-4 border flex flex-col w-fit gap-3 h-fit z-10 bg-gradient-to-r from-[#333446] to-[#273F4F] rounded-lg p-2 text-white">
		 	 <div className="flex justify-start gap-2 items-center p-1">
		 	 	<MdEdit size="20" />
		 	 	<p className="font-poppins font-bold text-sm">Edit Post</p>
		 	 </div>
		 	 <div onClick={() => deletePost(id)} className="flex justify-start gap-2 items-center p-1">
		 	 	<MdDeleteOutline size="20" />
		 	 	<p className="font-poppins font-bold text-sm">Delete Post</p>
		 	 </div>
		 </div>
		)
}

export default EditPost;
