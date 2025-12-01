import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const useProfile = () => {

  return useQuery({
    queryKey:["profile"],
    queryFn: async ()=> {
      const res = await axiosInstance.get("/account/api/profile/");
      return res.data;
    }
  })

}

