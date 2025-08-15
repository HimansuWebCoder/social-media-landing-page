import { CiMenuKebab } from "react-icons/ci";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";

import EditPost from "./components/EditPost";
import CommentPost from "./components/CommentPost";


import { useEffect,useRef, useState, useCallback } from "react";
import Container from "./components/Container";
import Pagination from "./components/Pagination2";

 function Paginate() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isShow, setIsShow] = useState(null); 
  const menuRef = useRef(null);

  function isToggleHandler(e) {
    if (e.currentTarget) {
      setIsShow(!isShow);
    } 
    
  }

   useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsShow(null);
      }
    }

    if (isShow !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShow]);

  function isToggleHandler(postId) {
    setIsShow(prevId => (prevId === postId ? null : postId));
}

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);

  const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

  const changePage = (pageNumber) => {
    setPage(pageNumber);
  };

  const deletePost = (postId) => {
    try {
      axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    } catch (err) {
      console.log("Error", err);
    }
  }

  const incrementPage = () => {
    setPage(page + 1);
    if (page + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const decrementPage = () => {
    setPage(page - 1);
    if ((page - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
    if (page - 1 === 0) {
      return null;
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_per_page=${pageSize}`
      );
      const fakePosts = await response.json();
      setPosts(fakePosts);
      setLoading(false);
    };

    fetchPosts();
  }, [page]);


  const totalPages = 10;

  return (
    <div className="w-full">
      <Container>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
         {
            posts.map((data, index) => (
              <div key={data.id}>
                 <div className="w-[20rem] gap-4 flex flex-col h-[20rem] relative  rounded-lg cursor-pointer p-4 bg-gradient-to-r from-[#FFFCFB] to-[#FFFDF6] m-auto mt-8">
      <div className="w-full flex justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <img src="./images/profile.png" alt="user" className="w-10 h-10 rounded-full" />
        </div>
                
        {/* <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
     
      </Button> */}
         <CiMenuKebab  onClick={() => isToggleHandler(data.id)} size="20" className="cursor-pointer" />
    <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >

    <MenuItem onClick={handleClose}><MdEdit size="20"/>Edit Post</MenuItem>
        <MenuItem><MdDeleteOutline onClick={() => deletePost(data.id)}  size="20" />Delete Post</MenuItem>
    </Menu>

{isShow === data.id && (
    <div ref={menuRef} className="absolute top-12 right-4 shadow-xl flex flex-col w-fit gap-3 h-fit z-10 bg-gradient-to-r from-[#333446] to-[#273F4F] rounded-md p-2 text-white">
        <div className="flex justify-start gap-2 items-center p-1">
            <MdEdit size="20" />
            <p className="font-poppins font-bold text-sm">Edit Post</p>
        </div>
        <div className="flex justify-start gap-2 items-center p-1">
            <MdDeleteOutline onClick={() => deletePost(data.id)} size="20" />
            <p className="font-poppins font-bold text-sm">Delete Post</p>
        </div>
    </div>
)}
        
        </div>
        <div className="w-full p-4 gap-4 h-[12rem] rounded-sm text-balance line-clamp-6 bg-[#13669E]" >
          <h1 className="font-playfair font-extrabold text-white text-2xl">{data.title}</h1>
          <h2 className="font-poppins text-sm text-[#FFF4EA]">{data.body}</h2>
        </div>
        {/* {
          isShow && <EditPost id={`${postId}`} />
        } */}
       <CommentPost id={data.id}/>
    </div>      
        </div>
             
            ))
          }
        </div>
        <Pagination
          totalPages={totalPages}
          pageSize={pageSize}
          page={page}
          changePage={changePage}
          incrementPage={incrementPage}
          decrementPage={decrementPage}
          pageNumberLimit={pageNumberLimit}
          minPageNumberLimit={minPageNumberLimit}
          maxPageNumberLimit={maxPageNumberLimit}
        />
      </Container>
      </div>
  );
}

export default Paginate;