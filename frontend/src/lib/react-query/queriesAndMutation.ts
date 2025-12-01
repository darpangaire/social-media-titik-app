
import axiosInstance from "./axiosInstance";


// Register api
export const registerUser = async(data:{
  name:string;
  username:string;
  email:string;
  password:string;
})=> {
  const response = await axiosInstance.post("account/apiregister/",data)
  return response.data;
}

// Login API (optional, for future use)

export const loginUser = async(data:{
  email:string;
  password:string;
})=> {
  const response = await axiosInstance.post("account/api/token/",data)
  return response.data;
}


