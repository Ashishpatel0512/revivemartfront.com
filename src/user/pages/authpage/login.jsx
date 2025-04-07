import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../../context/usercontext";
function Login() {
  const { user, login } = useAuth();
  console.log("user in login", user);
  const [emailid, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const Changeemail = (e) => {
    setEmail(e.target.value);
  };
  const Changepassword = (e) => {
    setPassword(e.target.value);
  };
  console.log(emailid);
  console.log(password);
  const submit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailid,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          alert(data.SuccessMsg);
          localStorage.setItem("token", data.token);
          setSuccess(true);
          login(data.user);
        } else {
          alert(data.ErrorMsg);
          setSuccess(false);
        }
      });
  };
  return (
    <>
      {success && <Navigate to="/" />}
      <div className="text-center h-screen w-screen bg-black bgimg">
        <div className="pt-[25vh] h-screen w-screen bg-gray-300 bg-opacity-20">
          <h1 className="text-white text-4xl font-bold mb-10 font-mono first-letter:text-5xl  first-letter:text-blue-500">
            ReviveMart
          </h1>
          <form action="" onSubmit={submit}>
            <div>
              <input
                type="email"
                name="emailid"
                placeholder="enter your email"
                onChange={Changeemail}
                className="w-[20vw] font-mono h-7 text-xl p-5 rounded-[3px]"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="enter your password"
                onChange={Changepassword}
                className="w-[20vw] font-mono h-7 mt-5 text-xl p-5 rounded-[3px]"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white w-[20vw] p-1 rounded-[3px] mt-5 font-mono shadow-sm shadow-white hover:text-black hover:bg-blue-200"
            >
              LOGIN
            </button>
            <div className="mt-10 text-white">
              no account?
              <Link
                to={"/register"}
                className="text-blue-400 decoration-solid	 pl-3"
              >
                signup
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
