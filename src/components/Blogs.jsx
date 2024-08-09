import { useState } from "react";
import ComponentPopup from "./ComponentPopup";
import SingleBlog from "./SingleBlog";
import SingleVideo from "./SingleVideo";
import SingleImage from "./SingleImage";
import { useUser } from "../context/user";

export function BlogPosts() {
  const [visibility, setVisibility] = useState(false);
  const {posts} = useUser();
  const [userTarget,setUserTarget] = useState({});

  function ClosePopup(e) {
    setVisibility(e);
    setUserTarget({});
  }

  function handleClick(target){
    setVisibility(!visibility);
    setUserTarget(target);
  }
  return (
    <>
      {/* <!-- post list  --> */}
      <ComponentPopup onClose={ClosePopup} show={visibility}>
        <SingleBlog userTarget={userTarget}/>
      </ComponentPopup>
      <div className="post-list flex flex-wrap gap-3 h-96  justify-between overflow-y-auto relative">
        {posts.blogs && posts.blogs.length > 0 ? (
          posts.blogs.map((data, index) => (
            <div key={index} onClick={()=>handleClick(data)} style={{ backgroundImage: `url(${data.media})` }} className={`rounded-xl h-32 basis-[48%] bg-secondary bg-cover bg-center cursor-pointer group relative overflow-hidden`}>
              <div className="hidden absolute group-hover:block group-hover:bg-black group-hover:opacity-30 top-0 right-0 bottom-0 left-0"></div>
            </div>
          ))
        ) : (
          <p>You don&apos;t have any posts</p>
        )}
      </div>
      {/* <!-- post list end --> */}
    </>
  );
}

export function BlogVideos() {
  const [visibility, setVisibility] = useState(false);
  const {videos} = useUser();
  const [userTarget, setUserTarget] = useState({});

  function ClosePopup(e) {
    setVisibility(e);
    setUserTarget({});
  }

  function handleClick(target) {
    setVisibility(!visibility);
    setUserTarget(target);
  }
  return (
    <>
      {/* <!-- post list  --> */}
      <ComponentPopup onClose={ClosePopup} show={visibility}>
        <SingleVideo userTarget={userTarget} />
      </ComponentPopup>
      <div className="post-list flex flex-col gap-3 h-96 overflow-hidden overflow-y-auto">
        {videos.blogs && videos.blogs.length > 0 ? (
          videos.blogs.map((data, index) => (
            <div key={index} onClick={() => handleClick(data)} className={`rounded-xl 
            min-h-32 max-h-32 w-full bg-secondary cursor-pointer group relative overflow-hidden`}>
              <video src={data.media} className="w-full h-full object-cover">
              </video>
              <div className="hidden absolute group-hover:block group-hover:bg-black group-hover:opacity-30 top-0 right-0 bottom-0 left-0"></div>
            </div>
          ))
        ) : (
          <p>you don&apos;t have any videos</p>
        )}
      </div>
      {/* <!-- post list end --> */}
    </>
  );
}

export function BlogImages() {
  const [visibility, setVisibility] = useState(false);
  const {images} = useUser();
  const [userTarget, setUserTarget] = useState({});

  function ClosePopup(e) {
    setVisibility(e);
    setUserTarget({});
  }

  function handleClick(target){
    setVisibility(!visibility);
    setUserTarget(target);
  }
  return (
    <>
    <ComponentPopup onClose={ClosePopup} show={visibility}>
      <SingleImage userTarget={userTarget}/>
    </ComponentPopup>
    <div className="post-list flex flex-wrap gap-3 h-96 overflow-hidden overflow-y-auto">
      <div className="grid grid-cols-2 grid-rows-5 w-full gap-4">
        {(images.blogs && images.blogs.length > 0) ? images.blogs.map((data, index) => (
              <div
                key={index}
                onClick={() => handleClick(data)}
                style={{ backgroundImage: `url(${data.media})` }}
                className={`rounded-xl  bg-secondary bg-cover bg-center cursor-pointer group relative item ${
                  index === 0 ? "row-span-1" : index === 1 || index === 2 || index === 3 ? "row-span-2" : index === 5 ? "row-span-1 col-span-2" : "row-span-1"
                } overflow-hidden`}>
                <div className="hidden absolute group-hover:block group-hover:bg-black group-hover:opacity-30 top-0 right-0 bottom-0 left-0"></div>
              </div>
          )
        ):(
          <p>you don&apos;t have any images</p>
        )}
      </div>
    </div>
    </>
  );
}
