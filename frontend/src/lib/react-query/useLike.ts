import { useMutation,useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/react-query/axiosInstance";


export const useLike = (postId:number) => {
  const qc = useQueryClient();

  const LikeMutation = useMutation({
    mutationFn: () => axiosInstance.post(`/post/posts/${postId}/like/`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
    
  });

  return {LikeMutation};

}


