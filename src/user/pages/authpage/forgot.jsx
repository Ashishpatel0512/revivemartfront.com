import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";

function Forgot() {
  const [emails, Changemail] = useState(null);
  const [success, Changsuccess] = useState(null);
  const [otps, Changotps] = useState(null);
  const [pass, setpass] = useState("");

  const emailid = (e) => {
    const selectedFile = e.target.value;
    Changemail(selectedFile);
    console.log("Selected file:", selectedFile); // Debug: check if the file is selected
  };
  const otp = (e) => {
    const selectedFile = e.target.value;
    Changotps(selectedFile);
    console.log("Selected file:", selectedFile); // Debug: check if the file is selected
  };
  const password = (e) => {
    const selectedFile = e.target.value;
    setpass(selectedFile);
    console.log("Selected file:", selectedFile); // Debug: check if the file is selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emailid: emails,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.success);
        Changsuccess(data.success);
        console.log(data.email);
        Changemail(data.email);
        if (data.success) {
          alert(
            "otp is sent in your email address please fill otp in 50 seconds"
          );
        } else {
          console.log(data);
          alert(data.message);
          Changsuccess(null);
        }
      });
  };
  const handleverify = async (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emailid: emails,
        otp: otps,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.success);
        Changsuccess(data.success);
        console.log(data.email);
        Changemail(data.email);
        if (data.success) {
          alert("change password");
          Changsuccess("verify");
          Changemail(data.email);
        } else {
          console.log(data);
          Changsuccess(null);
          Changemail("");
          alert(data.message);
        }
      });
  };
  //change password
  const chagepassword = async (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/forgot/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emailid: emails,
        password: pass,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.success);
        Changsuccess(data.success);
        if (data.success) {
          alert(data.message);
          Changsuccess("completed");
        } else {
          console.log(data);
          alert(data.message);
          Changsuccess(null);
          Changemail("");
        }
      });
  };
  return (
    <>
      <div className="body">
        {(() => {
          switch (success) {
            case "verify":
              return (
                <div className="text-center h-screen w-screen bg-black bgimg">
                  <div className="pt-[25vh] h-screen w-screen bg-gray-300 bg-opacity-20">
                  <div className="fixed top-[21%] left-[39%] p-10 rounded-[20px] shadow-2xl shadow-gray-600">

                    <h1 className="text-white text-3xl font-bold mb-3 font-mono first-letter:text-4xl  first-letter:text-blue-500">
                      ReviveMart
                    </h1>
                    <form onSubmit={chagepassword} className="login">
                      <h3 className="text-white text-lg mb-4 font-mono">
                        CHANGE-PASSWORD
                      </h3>
                      <input
                        type="password"
                        className="w-[20vw] font-mono h-7 text-xl p-5 rounded-[3px]"
                        name="password"
                        value={pass}
                        placeholder="ENTER PASSWORD"
                        onChange={password}
                        required
                      />
                      <br />
                      <br />
                      <button
                        type="submit"
                        className="bg-blue-500 text-white w-[20vw] p-1 rounded-[3px] mt-5 font-mono shadow-sm shadow-white hover:text-black hover:bg-blue-200"
                      >
                        CHANGE
                      </button>
                      <br />
                      </form>
                      </div>
                  </div>
                </div>
              );
            case "completed":
              return <Navigate to="/login" replace={true} />;
            case true:
              return (
                <div className="text-center h-screen w-screen bg-black bgimg">
                  <div className="pt-[25vh] h-screen w-screen bg-gray-300 bg-opacity-20">
                  <div className="fixed top-[21%] left-[39%] p-10 rounded-[20px] shadow-2xl shadow-gray-600">

                    <h1 className="text-white text-3xl font-bold mb-3 font-mono first-letter:text-4xl  first-letter:text-blue-500">
                      ReviveMart
                    </h1>
                    <form onSubmit={handleverify} className="login">
                      <h3 className="text-white text-lg  mb-4 font-mono ">
                        VERIFY-OTP
                      </h3>
                      <input
                        type="email"
                        className="w-[20vw] font-mono h-7 text-xl p-5 rounded-[3px]"
                        name="emailid"
                        value={emails}
                        placeholder="ENTER EMAIL"
                        onChange={emailid}
                        required
                      />
                      <br />
                      <input
                        type="text"
                        className="w-[20vw] font-mono h-7 text-xl p-5 mt-5 rounded-[3px]"
                        name="otp"
                        placeholder="ENTER OTP"
                        onChange={otp}
                        required
                      />
                      <br />
                      <br />
                      <button
                        type="submit"
                        className="bg-blue-500 text-white w-[20vw] p-1 rounded-[3px] mt-5 font-mono shadow-sm shadow-white hover:text-black hover:bg-blue-200"
                      >
                        VERIFY-OTP
                      </button>
                      <br />
                      </form>
                      </div>
                  </div>
                </div>
              );
            case null:
              return (
                <div className="text-center h-screen w-screen bg-black bgimg">
                  <div className="pt-[25vh] h-screen w-screen bg-gray-300 bg-opacity-20">
                  <div className="fixed top-[21%] left-[39%] p-10 rounded-[20px] shadow-2xl shadow-gray-600">
                    <h1 className="text-white text-3xl font-bold mb-3 font-mono first-letter:text-4xl  first-letter:text-blue-500">
                      ReviveMart
                    </h1>
                    <form onSubmit={handleSubmit} className="login">
                      <h3 className="text-white text-lg  mb-4 font-mono ">
                        SEND-OTP
                      </h3>
                      <input
                        type="email"
                        className="w-[20vw] font-mono h-7 text-xl p-5 rounded-[3px]"
                        name="emailid"
                        value={emails}
                        placeholder="ENTER EMAIL"
                        onChange={emailid}
                        required
                      />
                      <br />
                      <br />
                      <button
                        type="submit"
                        className="bg-blue-500 text-white w-[20vw] p-1 rounded-[3px] mt-5 font-mono shadow-sm shadow-white hover:text-black hover:bg-blue-200"
                      >
                        SEND-OTP
                      </button>
                      <br />
                      </form>
                    </div>
                  </div>
                </div>
              );
            default:
              return null;
          }
        })()}
      </div>
    </>
  );
}

export default Forgot;
