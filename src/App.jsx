import { useEffect, useState } from "react";
import generateData from "./dummy/data";
import { routes } from "./routers";
import { RouterProvider } from "react-router-dom";
import axios from "axios";
import { UserProvider } from "./context/user";
import { isAuthenticated } from "./components/ProtectedRoute";
function App() {
  const dummyData = generateData(10);
  const [user, setUser] = useState({});
  const [blogPost, setBlogPost] = useState({});
  const [blogImage, setBlogImage] = useState({});
  const [blogVideo, setBlogVideo] = useState({});
  const isAuth = isAuthenticated();

  useEffect(() => {
    if(isAuth) {
      refreshUser();
      refreshBlog("blog", setBlogPost);
      refreshBlog("image", setBlogImage);
      refreshBlog("video", setBlogVideo);
    }
  }, []);

  async function refreshUser() {
    try {
      const id = localStorage.getItem("id");
      const response = await axios.get(`/v1/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const newuser = await response.data.data;
      setUser(newuser);
    } catch (error) {
      console.log(error);
    }
  }

  async function refreshBlog(blogType, setBlog) {
    try {
      const response = await axios.get(`/v1/api/${blogType}?type=current`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const newBlog = await response.data.data;
      setBlog(newBlog);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <UserProvider user={user} setUser={setUser} posts={blogPost} setPosts={setBlogPost} images={blogImage} setImages={setBlogImage} videos={blogVideo} setVideos={setBlogVideo}>
        <RouterProvider router={routes} />
      </UserProvider>
    </>
  );
}

export default App;
