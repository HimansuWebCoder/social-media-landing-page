import './App.css';
import GetPost from "./components/GetPost";
import CreatePost from "./components/CreatePost";

function App() {
  return (
    // <div className="bg-[#212121] h-full">
    //   {/* <CreatePost /> */}
    //   <GetPost />
    // </div>
     <div className="h-full bg-white/10 backdrop-blur-xl border-white/20 shadow-lg">
    <img
    src="./images/bg1.jpeg"
    alt=""
    className="absolute inset-0 w-full h-full object-cover"
  />

  <div className="md:h-[82rem] bg-white/10 backdrop-blur-xl border-white/20 shadow-lg">
      <GetPost />
  </div>
    </div>
  );
}

export default App;
