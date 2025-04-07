import { useState } from "react";
import { useAuth } from "../../context/usercontext";
import { CiSquareRemove } from "react-icons/ci";
import Loader from "./Loader";
function Dpedit({ uploadform, setuploadform }) {
  const { login } = useAuth();
  const [loader, setloader] = useState(false);
  const [dp, setdp] = useState("");
  const backindex = ` ${
    uploadform
      ? "z-4 w-[100%] h-[100%] fixed top-[0px] left-[0px] bg-black opacity-85"
      : ""
  }`;
  const disply =
    "border-2 w-[90%] m-[10px] border-black inline-block rounded-[5px]";
  const formdisplay = `text-black bg-white inline-block fixed top-[20%] left-[45%] rounded-[5px] pt-7 ${
    uploadform ? "" : "hidden z-100"
  } `;

  const Changedp = (e) => {
    setdp(e.target.files[0]);
  };

  console.log(dp);
  console.log(localStorage.getItem("token"));

  const handleFileUpload = async (event) => {
    event.preventDefault();
    setloader(true);
    const formData = new FormData();

    formData.append("dp", dp);

    const response = await fetch("http://localhost:3000/editdp", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      console.log("File uploaded successfully:", result);
      login(result.User);
      setloader(false);
      alert("File uploaded successfully");
      setuploadform(false);
    } else {
      console.log("Upload failed:", result);
      setloader(false);
      alert("Upload failed:");
      setuploadform(false);
    }
  };

  return (
    <>
      {loader ? <Loader /> :
        <div>
          <div className={backindex}></div>
          <div className={formdisplay}>
            <CiSquareRemove
              className="text-3xl relative left-1 text-white bottom-20"
              onClick={() => {
                setuploadform(false);
              }}
            />
            <h1 className="text-center font-semibold">Edit dp</h1>
            <form onSubmit={handleFileUpload}>
              <input type="file" name="dp" className={disply} onChange={Changedp} />
              <br />
              <br />
              <input
                type="submit"
                value="submit"
                className="bg-emerald-700 ml-[33%]	text-white text-[20px] rounded-[5px] pt-1 pb-1 pl-5 pr-5 mb-7 hover:bg-emerald-400"
              />
            </form>
          </div>
        </div>
      }
    </>
  );
}
export default Dpedit;
