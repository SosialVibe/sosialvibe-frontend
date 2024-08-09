import { NavLink, useNavigate } from "react-router-dom";
import UpdateBody from "./UpdateBody";
import { useState } from "react";
import { useUser } from "../context/user";
import { AlertMessage } from "./AlertMessage";
import axios from "axios";

export default function UpdatePost() {
  return (
    <>
      <UpdateBody>
        <EditPost />
      </UpdateBody>
    </>
  );
}
function EditPost() {
  const [tempImage, setTempImage] = useState(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [msg, setMsg] = useState(null);
  const { user } = useUser();
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
    if (title === "" || desc === "" || image === null) {
      setMsg({ message: "All fields are required!", status: false });
      setTimeout(() => setMsg(null), 5000);
    } else {
      if (image !== null) {
        // if file uploaded is image
        if (image.type === "image/jpeg" || image.type === "image/png" || image.type === "image/gif" || image.type === "image/jpg") {
          uploadFile();
        } else {
          setMsg({ message: "Invalid Image Type, Only file image type png,jpeg,jpg,gif are allowed!", status: false });
          setTimeout(() => setMsg(null), 5000);
        }
      }
    }
  }

  async function uploadFile(fileType) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", desc);
    formData.append("blog-banner", image);

    try {
      const response = await axios.post(`/v1/api/blog`, formData, {
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
      {msg !== null && <AlertMessage type={msg.status} style="mt-2">{msg.message}</AlertMessage>}
      <div className="p-4 bg-secondary mt-5 rounded-xl">
        <h4 className="text-2xl font-semibold my-3 mb-5 tracking-widest">Upload Your Post</h4>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Blog title" className="w-full  rounded p-4 mb-4 placeholder:font-extralight text-lg" onChange={(e) => setTitle(e.target.value)} value={title}/>
          <div>
            <input type="file" id="file" className="hidden" onChange={handleUpload}/>
            <label htmlFor="file" style={{backgroundImage: `url(${tempImage})` }} className="w-full h-[210px] bg-white block rounded cursor-pointer p-2 bg-cover">
              <div className="border-dashed border-2 border-slate-400 h-full flex flex-col">
                <img src="./../src/assets/icons/image-gallery.png" alt="" className="w-12 mx-auto mt-10 mb-3" />
                <p className="text-center">Upload your image</p>
                <p className="text-center text-xs font-light ">Support JPG/PNG/JPEG/GIF for image</p>
              </div>
            </label>
          </div>

          {/* <!-- trix editor --> */}
          <div className="edittor my-4 bg-white">
            {/* <input id="x" type="hidden" name="content" /> */}
            {/* <trix-editor input="x" class="trix-content overflow-y-auto h-60" placeholder="Blog content ..."></trix-editor> */}
            <textarea className="overflow-y-auto min-h-60 w-full p-3" placeholder="Blog content ..." onChange={(e) => setDesc(e.target.value)} value={desc}></textarea>
          </div>
          {/* <!-- trix editor end  --> */}

          <div className="flex justify-end mt-4 text-2xl ">
            <NavLink to={"/"} className="px-2 m-1 bg-zinc-500 text-white uppercase">Cancel</NavLink>
            <button type="submit" className="px-2 m-1 bg-[#39A7FF] text-white uppercase">Save</button>
          </div>
        </form>
      </div>
      {/* <!-- post upload box end --> */}
    </>
  );
}
