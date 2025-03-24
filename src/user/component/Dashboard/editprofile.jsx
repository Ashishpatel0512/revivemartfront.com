import { useState } from "react";
import { useAuth } from "../../context/usercontext";
function EditProfile({updateform,setupdateform}) {
  const {login}=useAuth()
  const [name, setname] = useState("");
  const [emailid, setemailid] = useState("");

  const backindex=` ${updateform?"z-4 w-[100%] h-[100%] fixed top-[0px] left-[0px] bg-black opacity-85":""}`
  const disply="border-2 w-[90%] m-[10px] border-black inline-block rounded-[5px]";
  const formdisplay=`text-black bg-white inline-block fixed top-[20%] left-[45%] rounded-[5px] pt-7 ${updateform?"":"hidden z-100"} `

const Changename=(e)=>{
  setname(e.target.value)
}
const Changemailid=(e)=>{
  setemailid(e.target.value)
}

console.log(name,emailid)
console.log(localStorage.getItem("token"))
  
  

  const handleFileUpload = async (event) => {
    event.preventDefault();
   
    const response = await fetch('http://localhost:3000/editprofile', {
      method: 'POST',
      headers:{
        "Authorization":localStorage.getItem("token"),
        'Content-Type': 'application/json'

    },
      body: JSON.stringify({
        name,
         emailid
      })
     });

    const result = await response.json();
    if (result.success) {
      console.log('update successfully:', result);
      login(result.User)
      alert(result.SuccessMsg);
      setupdateform(false)
    } else {
      console.log('Updated failed:', result);
      alert(result.ErrorMsg)
      setupdateform(false)
    }
  };

  return (
    <>
    <div className={backindex}>
    </div>
    <div className={formdisplay}>
      <form onSubmit={handleFileUpload}>
                    
                    <input type="text" name="name" className={disply} onChange={Changename} /><br /><br />
                    <input type="email" name="emailid" className={disply} onChange={Changemailid} /><br /><br />

                    <input type="submit" value="submit"  className="bg-emerald-700	text-white text-[20px] rounded-[5px] pt-1 pb-1 pl-5 pr-5 mb-7 hover:bg-emerald-400"/>

        </form>
        </div>
       
    </>

  );
}
export default EditProfile;
