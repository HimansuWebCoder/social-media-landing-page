import axios from "axios";
import { useEffect, useState } from "react";
// import Card from "./Card";
import CommentPost from "./CommentPost";
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineClose } from "react-icons/md";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Paginate from '../Paginate';

import Post from './Post';
import Pagination from './Pagination';

import Card from "./Card.js";

function GetPost() {
	const [ posts, setPosts ] = useState([]);
  const [ title, setTitle ] = useState("");
	const [ body, setBody ] = useState("");
	const [ newPosts, setNewPosts ] = useState([]);
	const [ isShow, setIsShow ] = useState(false);
	const [loading, setLoading] = useState(true);

	const [openMenuId, setOpenMenuId] = useState(null); 
  const [showCreatePost, setShowCreatePost] = useState(false); 


   useEffect(() => {
    if (isShow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isShow]);

function handleMenuToggle(postId) {
  setOpenMenuId(prevId => (prevId === postId ? null : postId));
}


	const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPge, SetPostsPerPage] = useState(12);
	

	function loadingPost() {
		setLoading(false);
	}

	useEffect(() => {
		console.log("loading");
		setTimeout(() => {
        axios
          .get("https://jsonplaceholder.typicode.com/posts")
          .then((res) => {
          	setNewPosts(res.data);
             loadingPost();
		       	console.log("loading done");
          	console.log(res.data)
          })
           .catch((err) => {
           	 console.log(err.message);
           })
		}, 2000)
      
	}, []);

     const indexOfLastPost = currentPage * postsPerPge;
     const indexOfFirstPost = indexOfLastPost - postsPerPge;
     const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

     const handlePagination = (pageNumber) => {
      setCurrentPage(pageNumber);
     }

	let id = 100;

	function isShowHandler() {
		setIsShow(true);
	}

	function isHideHandler() {
		setIsShow(false);
	}

	function submitHandler(e) {
     e.preventDefault();
     const nextId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 101;

     const newPost = {
		  id: nextId,
     	title: title,
     	body: body,
     };

     axios
          .post("https://jsonplaceholder.typicode.com/posts", newPost)
          .then((res) => {
          	console.log(res.data);
			      setPosts((prevPosts) => [res.data, ...prevPosts]); 
			      setTitle("");
		      	setBody("");
          	console.log("Post uploaded successfully");
			      console.log(posts);
          })
          .catch((err) => {
          	console.log("Something went wrong", err)
          });
	};

	useEffect(() => {
      axios
          .get("https://jsonplaceholder.typicode.com/posts")
          .then((res) => {
          	setPosts(res.data);
          	console.log(res.data)
          })
           .catch((err) => {
           	 console.log(err.message);
           })
	}, []);


	return (
		<div className="flex flex-col md:grid md:grid-cols-1 gap-2 p-4 w-full h-fit overflow-x-auto [&::-webkit-scrollbar]:hidden m-auto">
      {
							isShow && (
								<div className="fixed inset-0 bg-b h-screen backdrop-blur-sm flex justify-center items-center  z-50">
                <form
                  onSubmit={submitHandler}
                  className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 flex flex-col gap-5 animate-fadeIn"
                >
                  <div className="flex justify-between">
                    <h2 className="text-2xl font-semibold text-gray-800 font-poppins">
                      Create a New Post
                    </h2>
                    <MdOutlineClose
                      size="28"
                      onClick={isHideHandler}
                      className="text-gray-500 hover:text-gray-800 cursor-pointer transition-colors"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Your post's title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-3 rounded-lg border border-gray-300 focus:border-blue-500 text-sm outline-none transition-all"
                  />

                  
                  <textarea
                    placeholder="Share your Thoughts"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows="5"
                    className="p-3 rounded-lg border border-gray-300 focus:border-blue-500 text-sm outline-none transition-all resize-none"
                  />

                
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white font-medium py-3 rounded-lg shadow-lg transition-all duration-300"
                  >
                    Post
                  </button>
                </form>
            </div>

								)
						}

			<div className="w-full grid grid-cols-1 gap-8 h-fit relative m-auto to-red-500">
			
     <div className="bg-gradient-to-r from-[#2C4E80] via-[#113F67] rounded-lg top-0 to-[#34699A] shadow-md p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

  <div className="flex flex-col md:flex-row md:items-center md:gap-8">
    <div className="flex items-center gap-2">
       <img src="./images/laptop.png" alt="logo" className="w-12 h-12 rounded-full" />
    </div>
    <h1 className="text-white text-2xl font-roboto font-bold">All Posts</h1>
    <h2 className="text-gray-300 text-lg font-roboto">Manage All Posts</h2>
  </div>

 
  <button
    onClick={isShowHandler}
    className="flex items-center gap-2 bg-[#EFEEEA] hover:bg-white text-[#273F4F] font-bold py-2 px-4 rounded-lg transition-colors duration-300"
  >
    <CiCirclePlus size="24" />
    Create Post
  </button>
</div>
											 </div>
                       
                       
					 {loading ? (
						<Box sx={{ display: 'flex', margin: 'auto', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
						<CircularProgress />
						</Box>
					 ) : (

 					    <div className="">
                          {/* {
								posts.map((post) => (
									<>
									<Card postName={post.title} postContent={post.body} postId={post.id} key={post.id} />
									</>
									))
							} */}
							{/* <Card 
							posts={currentPosts} 
							loading={loading}
							openMenuId={openMenuId} 
              onToggleMenu={handleMenuToggle}
							/> */}

              <Paginate />
					    </div>
					 )}

					 {/* <Pagination length={posts.length} postsPerPage={postsPerPge} handlePagination={handlePagination} currentPage={currentPage} /> */}
		</div>
		)
}

export default GetPost;

