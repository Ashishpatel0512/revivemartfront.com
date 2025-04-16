import React,{useState} from "react";
import {Navigate,Link} from "react-router-dom";




function Register(){
    const [name,setName]=useState("");
    const [emailid,setEmailid]=useState("");
    const [password,setPassword]=useState("");
    const [success,setSuccess]=useState(false);

    const Changename=(e)=>{
        setName(e.target.value);
    }
    const Changeemail=(e)=>{
        setEmailid(e.target.value);
    }
    const Changepassword=(e)=>{
        setPassword(e.target.value);
    }
    const submit=(e)=>{
        e.preventDefault();
        fetch("http://localhost:3000/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                name,
                emailid,
                password
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data);
            if(data.success){
                alert(data.SuccessMsg);
                setSuccess(true);
                
            }
            else{
                alert(data.ErrorMsg);
                setSuccess(false);
            }
        }
        )
    }
    
     return(
        <>
        {success && <Navigate to="/login"/>}
        <div className='text-center h-screen w-screen  bg-black bgimg'>
                 <div className='pt-[25vh] h-screen w-screen bg-gray-300 bg-opacity-20'>
                     <div className="fixed top-[21%] left-[39%] p-10 rounded-[20px] shadow-2xl shadow-gray-600">
                   <h1 className='text-white text-3xl font-bold mb-10 font-mono first-letter:text-4xl  first-letter:text-blue-500'>ReviveMart</h1>
             <form onSubmit={submit} action="" className="text-center">
                <input type="text" name="name" placeholder="ENTER YOUR NAME" value={name} className="w-[20vw] font-mono h-7 text-xl p-5 rounded-[3px]" onChange={Changename}/><br /> <br />
                <input type="email" name="emailid" placeholder="ENTER YOUR EMAILID" value={emailid} className="w-[20vw] font-mono h-7 text-xl p-5 rounded-[3px]" onChange={Changeemail} /><br /> <br />
                <input type="password" name="password" placeholder="ENTER YOUR PASSWORD" value={password} className="w-[20vw] font-mono h-7 text-xl p-5 rounded-[3px]" onChange={Changepassword} /><br /> <br />
                <button type="submit" className="bg-blue-500 text-white w-[20vw] p-1 rounded-[3px] mt-5 font-mono shadow-sm shadow-white hover:text-black hover:bg-blue-200">Register</button>
                <div className='mt-10 text-white'>alredy account?<Link to={"/login"} className='text-blue-400 decoration-solid pl-3'>Login</Link></div>

                         </form>
                         </div>
                </div>
            </div>
        </>
     )
    


}

export default Register;