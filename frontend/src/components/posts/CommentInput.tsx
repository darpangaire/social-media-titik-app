import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/react-query/axiosInstance";



const CommentInput = ({postId}:any)=> {
  const [text,setText] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn:  () => axiosInstance.post(`/post/posts/${postId}/comments/`, {
      content: text
    }),
    onSuccess: () => {
      setText("");
      queryClient.invalidateQueries({queryKey:["comments",postId]});
    }
  })

  return (
    <div className="flex gap-2">
      <input value={text} onChange={(e)=> setText(e.target.value)} 
      className="border p-2 rounded-lg flex-1"
        placeholder="Write a comment..."/>

      <button onClick={()=> mutation.mutate()}
        className="bg-blue-500 text-white px-3 rounded-lg">Send</button>


    </div>
  )

}

export default CommentInput;
