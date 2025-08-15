import { MdKeyboardArrowRight } from "react-icons/md"
import { MdKeyboardArrowLeft } from "react-icons/md";
const Pagination = ({ postsPerPage, length, handlePagination, currentPage }) => {
    let paginationNumber = []
    for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
        paginationNumber.push(i);
    }
    return (
        <div className="w-full flex justify-center items-center mt-6 gap-2  font-poppins">
          <MdKeyboardArrowLeft size="40" className="text-white bg-blue-600 rounded-lg"/>
  {paginationNumber.map((data) => (
    <button
      key={data}
      onClick={() => handlePagination(data)}
      className={`w-9 h-9 rounded-md border transition-all duration-200 ease-in-out shadow-sm 
        ${
          currentPage === data
            ? 'bg-blue-600 text-white border-[#2C4E80] scale-105 shadow-md'
            : 'bg-white text-gray-700 hover:bg-[#2C4E80] hover:text-white hover:border-[#2C4E80]'
        }`}
    >
      {data}
    </button>
  ))}
   <MdKeyboardArrowRight size="40" className="text-white bg-blue-600 rounded-lg"/>
</div>

    )
}
export default Pagination