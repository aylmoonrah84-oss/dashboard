import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
 import fetchData from "../../../Utils/fetchData"
 import notify from "../../../Utils/notify"
 
export default function CreateBrand() {
  const [title,setTitle]=useState("");
  const [img,setImg]=useState(null);
  const [isPublished,setIsPublished]=useState(true);
  const {token}=useSelector((state)=>state.auth);
  const navigate=useNavigate();
  const [loading,setLoading]=useState(false);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);
    let image="";

    if(img){
      const formatData=new FormatData();
      formatData.append("file",img);

      const uploadRes=await fetchData("brands",{
        method:"POST",
        headers:{
          "content-type":"application/json",
          authorization:`Bearer ${token}`,
        },
      });
      if(uploadRes.success){
        image=uploadRes.data;
      }else{
        setLoading(false);
        return notify("error",uploadRes.message);
      }
     }
     const result=await fetchData("brands",{
        method:"POST",
        headers:{
          "content-type":"application/json",
          authorization:`Bearer ${token}`,
        },
        body:JSON.stringify({
          title,image,isPublished,
        }),
  
  })
  if (result.success){
    notify("success",result.message);
    navigate("/dashboard/brand");

  }else{
    setLoading(false)
  }
}
  return (
    <div>
      
    </div>
  )
}
