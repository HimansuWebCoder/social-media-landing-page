import { FaRegCommentDots } from "react-icons/fa";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import CommentForm from "./CommentForm";

function CommentPost({id}) {
  const [ isShowModal, setIsShowModal ] = useState(false);

   useEffect(() => {
    if (isShowModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isShowModal]);


  function isShowModalHandler() {
	  setIsShowModal(true);
  }
  function isHideModalHandler() {
	  setIsShowModal(false);
  }

	return (
		<div className="w-full flex justify-end items-center">
			<div onClick={isShowModalHandler} className="flex flex w-fit cursor-pointer justify-end gap-3 h-fit">
				<FaRegCommentDots size="20" className="" />
				<h2 className="font-poppins text-sm">Comments</h2>
			</div>
			{ isShowModal && (
				<Modal isTrue={isHideModalHandler} child={<CommentForm id={id}/>} />
			)}
		</div>
	)
}

export default CommentPost;



 

