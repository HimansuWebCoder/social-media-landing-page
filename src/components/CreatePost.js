import { CiEdit } from "react-icons/ci";
import axios from "axios";
import { useState, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";

function CreatePost({}) {
	const [ title, setTitle ] = useState("");
	const [ body, setBody ] = useState("");
	const [ newPosts, setNewPosts ] = useState([]);

	const [ isShow, setIsShow ] = useState(false);

	useEffect(() => {
      axios
          .get("https://jsonplaceholder.typicode.com/posts")
          .then((res) => {
          	setNewPosts(res.data);
          	console.log(res.data)
          })
           .catch((err) => {
           	 console.log(err.message);
           })
	}, []);

	function isShowHandler() {
		setIsShow(!isShow);
	}

	function isHideHandler() {
		setIsShow(false);
	}

	function submitHandler(e) {
     e.preventDefault();

     const newPost = {
     	title: title,
     	body: body,
     };

     axios
          .post("https://jsonplaceholder.typicode.com/posts", newPost)
          .then((res) => {
          	console.log(res.data);
			setNewPosts((prevPosts) => [res.data, ...prevPosts]);
			setTitle("");
			setBody("");
          	console.log("Post uploaded successfully");
			console.log(newPosts);
          })
          .catch((err) => {
          	console.log("Something went wrong", err)
          });
	};

	return (
		 <div className="max-w-full grid grid-cols-1 gap-8 h-fit relative m-auto p-4 to-red-500">

		 <div className="flex justify-between cursor-pointer gap-4 bg-gradient-to-r  top-0 from-[#393E46] via-[#222831] to-[#273F4F] shadow-md p-2 justify-center items-center">
			<div className="text-white text-2xl font-roboto font-bold">
				All Posts
			</div>
			<div onClick={isShowHandler} className="flex items-center justify-center gap-2">
					<h1 className="font-bold font-roboto text-2xl  text-white ">Create Post</h1>
					<CiEdit size="30" className="cursor-pointer text-[#EFEEEA]" />
			</div>
		 	
		 </div>

		  <div className="flex justify-between cursor-pointer gap-4 bg-gradient-to-r  top-0 from-[#393E46] via-[#222831] to-[#273F4F] shadow-md p-2 justify-center items-center">
			<div className="text-white text-2xl font-roboto font-bold">
				Manage All Posts
			</div>
		 </div>

		 	{
		 		isShow && (
                    <div>
						
                      <form className="absolute top-20 right-0  p-4 shadow-2xl rounded-2xl max-w-[30rem] z-10 bg-gradient-to-r from-[#26355D] to-[#0A97B0] h-fit flex flex-col justify-center items-center gap-4 border-black" onSubmit={submitHandler}>
						<div onClick={isHideHandler} className="w-full flex justify-end">
                          <MdOutlineClose size="30" className="text-white cursor-pointer"/>
						</div>
                      	  <input
                      	     type="text"
                      	     placeholder="Post Title"
                      	     value={title}
                      	     onChange={(e) => setTitle(e.target.value)}
                      	     className="p-2 rounded-lg font-poppins shadow-2xl w-full focus:outline-none"
                      	     />
                      	   <textarea
                             placeholder="Post Body"
                             value={body}
                             onChange={(e) => setBody(e.target.value)}
                             className="p-2 rounded-lg font-poppins shadow-2xl w-full focus:outline-none"
                      	     />
                      	  <button className="border shadow-2xl rounded-lg text-white p-2 font-bold font-roboto" type="submit">Create Post</button>
                      </form>
					  </div>
		 			)
		 	}
		 </div>
		)
}

export default CreatePost;
