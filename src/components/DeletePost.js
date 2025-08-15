import axios from "axios";
import { useEffect, useState } from "react";

function DeletePost() {
	const [ posts, setPosts ] = useState([]);

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
    <div></div>
		)
}

export default DeletePost;
