import { FaRegComments } from "react-icons/fa6";
import { useState, useEffect } from "react";
import axios from "axios";  
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function CommentForm({id}) {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [commentBody, setCommentBody] = useState("");
    const [loading, setLoading] = useState(true);

	function loadingPost() {
		setLoading(false);
	}

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
            .then((res) => {
                setComments(res.data);
                loadingPost();
            })
            .catch((err) => {
                console.error("Error fetching comments:", err);
            }); 
    }, [])
    
    function addCommentHandler(e) {
        e.preventDefault();
        const newComment = {
            postId: id,
            name: comment,
            body: commentBody,
        };

        axios.post(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, newComment)
            .then((res) => {
                setComments([res.data, ...comments]);
                setComment("");
                setCommentBody("");
                console.log("Comment added successfully");
                console.log(comments);
            })
            .catch((err) => {
                console.error("Error while commenting", err);
            });
    }
    


    return (
        <div className="w-full mt-4">
        <form className="flex flex-col w-full p-4 gap-4 border rounded-lg">
            <h2 className="text-lg font-opensans font-medium">Add a Comment</h2>
            <input
                type="text"
                className="p-2 border bg-blue-50 focus:outline-none rounded-md"
                placeholder="Comment Title"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <textarea
                className="p-2 border bg-blue-50 focus:outline-none rounded-md"
                placeholder="Write a comment..."
                rows="4"
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#4793AF] text-white p-2 font-poppins rounded-md hover:bg-blue-600"
                onClick={addCommentHandler}
            >
                Submit Comment
            </button>
            </div>
        </form>
{/* All Comments */}
         <div className="flex justify-start items-center gap-4 border-b-2 border-gray-200 p-2">
            <FaRegComments size="30" className="text-gray-500 mt-2" />
            <h3 className="text-lg font-opensans font-medium mt-4">All Comments</h3>
        </div>

        <div className="max-h-[8rem] overflow-y-auto">
            { loading ? (
                <Box sx={{ display: 'flex', margin: 'auto', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                {
                    comments.map((comment) => (
                        <div key={comment.id} className="p-4 border-b border-gray-200">
                            <h4 className="font-semibold">{comment.name}</h4>
                            <p className="text-gray-600">{comment.body}</p>
                        </div>
                    ))  
                }
                </>
            )}
        
        </div>
        </div>

    );
}   
export default CommentForm;

// [&::-webkit-scrollbar]:hidden 