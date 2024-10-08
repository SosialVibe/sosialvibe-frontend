import { useState } from "react";
import { MainFrame } from "../components/Frame";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AlertMessage } from "../components/AlertMessage";

export default function RegisterPage() {
  return (
    <>
      <MainFrame>
        <Register />
      </MainFrame>
    </>
  );
}

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const SignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/v1/auth/register`,
        { email, password, }
      );
      if (response.status >= 200 && response.status < 300) {
        setMsg({message: "Register Success",status:1000});
        setTimeout(()=>{
          setMsg(null);
          navigate("/login");
        },1000);
      }
    } catch (error) {
      if (error.response) {
        setMsg({ message: error.response.data.message, status: false });
        setTimeout(() => setMsg(null), 3000);
      }
    }
  };

  return (
    <>
      <div className="content">
        <div className="logo mx-16">
          <p className="text-5xl font-bold">
            <img src="/sosial-vibe.svg" alt="sosial vibe logo" className="w-full" />
          </p>
        </div>
        <h4 className="text-2xl font-semibold my-5">Sign Up</h4>
        {msg !== null && (
          <AlertMessage type={msg.status} style="w-3/4">
            {msg.message}
          </AlertMessage>
        )}
        <form onSubmit={SignUp} className="flex flex-col w-3/4">
          <input required type="text" onChange={e => setEmail(e.target.value)} value={email} placeholder="Enter Email" className="w-full py-4 px-6 text-lg placeholder:text-slate-900  rounded mb-4 bg-[#FEEED9]" />
          <input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" className="w-full py-4 px-6 text-lg placeholder:text-slate-900  rounded mb-4 bg-[#FEEED9]" />
          <button className="w-full text-slate-900 rounded-lg block text-center py-2 px-4 mx-auto bg-primary text-white font-bold text-3xl tracking-widest">Create</button>
        </form>
        <div className="flex gap-2 items-center my-2 w-1/2">
          <hr className="w-1/2 bg-black" />
          <p className="text-2xl font-light">OR</p>
          <hr className="w-1/2 bg-black" />
        </div>
        <a href="./register" className="text-slate-900 rounded block text-center py-1 px-4 mx-auto border-4 border-[#87C4FF] w-3/4 font-semibold text-3xl tracking-widest">
          FACEBOOK
        </a>
        <div className="flex flex-row gap-3 text-sm justify-center my-2">
          <a href="/login" className="hover:text-primary-dark text-slate-900 mt-5 inline-block">
            Forget Password? |
          </a>

          <p>
            Do you have Account?{" "}
            <a href="./login" className="hover:text-primary-dark text-slate-900 mt-5 inline-block font-bold">
              Login
            </a>
          </p>
        </div>
        {/* <!-- blue waves start  --> */}
        <img src="/assets/icons/waves-top.svg" alt="wave top" className="w-full mt-5" />
      </div>
    </>
  );
}
