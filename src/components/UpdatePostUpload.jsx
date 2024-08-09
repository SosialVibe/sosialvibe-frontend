import { useState } from "react";
import UpdateBody from "./UpdateBody";
import { NavLink, useNavigate } from "react-router-dom";
import { AlertMessage } from "./AlertMessage";
import axios from "axios";
import { useUser } from "../context/user";

export default function UpdatePostUpload() {
  return (
    <>
      <UpdateBody>
        <EditPostUpload />
      </UpdateBody>
    </>
  );
}
function EditPostUpload() {
  const [tempImage, setTempImage] = useState(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [msg,setMsg] = useState(null);
  const {user} = useUser();
  const navigate = useNavigate();
  function handleUpload(e) {
    // temp image
    const temp = e.target.files[0];
    // convert to url
    setTempImage(URL.createObjectURL(temp));
    setImage(temp);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(title === "" || desc === "" || image === null) {
      setMsg({ message: "All fields are required!", status: false });
      setTimeout(() => setMsg(null), 5000);
    }else{
      if(image !== null) {
        let fileType = image.type.split("/")[0];
        // if file uploaded is video
        if(fileType === "video"){
          if (image.type === "video/mp4") {
            uploadFile(fileType);
          }else{
            setMsg({ message: "Invalid Video Type, Only file video type mp4 are allowed!", status: false });
            setTimeout(() => setMsg(null), 5000);
          }
        }else{
          // if not video
          if(image.type === "image/jpeg" || image.type === "image/png" || image.type === "image/gif" || image.type === "image/jpg") {
            uploadFile(fileType);
          }else{
            setMsg({ message: "Invalid Image Type, Only file image type png,jpeg,jpg,gif are allowed!", status: false });
            setTimeout(() => setMsg(null), 5000);
          }
        }
      }
    }
  }

  async function uploadFile(fileType) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", desc);

    if(fileType == "image") {
      formData.append("image", image);
    }else if(fileType == "video") {
      formData.append("video", image);
    }

    try {
      const response = await axios.post(`/v1/api/${fileType}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await response.data;
      setMsg({ message: result.message, status: true });
      return setTimeout(() => {
        setMsg(null);
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      if (error.response) {
        setMsg({ message: error.response.data.message, status: false });
        setTimeout(() => {
          setMsg(null);
          navigate("/");
        }, 3000);
      }
    }
  }

  return (
    <>
      {/* <!-- post upload box --> */}
      {msg !== null && (
        <AlertMessage type={msg.status} style="mt-2">
          {msg.message}
        </AlertMessage>
      )}
      <div className="p-4 bg-secondary mt-5 rounded-xl">
        <h4 className="text-2xl font-semibold my-3 mb-5 tracking-widest">Upload Your Post</h4>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" className="w-full rounded p-4 mb-4 placeholder:font-extralight text-lg" defaultValue={user.name} readOnly />
          <input type="text" placeholder="Your Title" className="w-full rounded p-4 mb-4 placeholder:font-extralight text-lg" onChange={e => setTitle(e.target.value)} value={title} />
          <textarea name="" id="" cols="10" rows="5" placeholder="Description ..." className="w-full rounded p-4 mb-4 placeholder:font-extralight text-lg" onChange={e => setDesc(e.target.value)} value={desc}></textarea>
          <div>
            <input type="file" id="file" className="hidden" onChange={handleUpload} />
            <label htmlFor="file" style={{ backgroundImage: `url(${tempImage})` }} className="w-full h-[210px] bg-white block rounded cursor-pointer p-2 bg-cover">
              <div className="border-dashed border-2 border-slate-400 h-full flex flex-col">
                <img src="./../src/assets/icons/image-gallery.png" alt="" className="w-12 mx-auto mt-10 mb-3" />
                <p className="text-center">Upload your image / Video</p>
                <p className="text-center text-xs font-light ">Support mp4 for video</p>
                <p className="text-center text-xs font-light ">Support JPG/PNG/JPEG/GIF for Image</p>
              </div>
            </label>
          </div>
          <div className="flex justify-end mt-4 text-2xl ">
            <NavLink to={"/"} className="px-2 m-1 bg-zinc-500 text-white uppercase">
              Cancel
            </NavLink>
            <button type="submit" className="px-2 m-1 bg-[#39A7FF] text-white uppercase">
              Save
            </button>
          </div>
        </form>
      </div>
      {/* <!-- post upload box end --> */}
    </>
  );
}
