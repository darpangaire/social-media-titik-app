import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/react-query/axiosInstance";
import CommentInput from "./CommentInput";


const Comment = ({postId}:any) => {
  const {data} = useQuery({
    queryKey: ["comments",postId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/post/posts/${postId}/comments/`);
      return response.data;
    }
  })

  return (
    <div className="mt-2">
      <CommentInput postId={postId} />

      {data?.map((comment:any) => (
        <div key={comment.id} className="bg-gray-100 p-2 rounded-lg mt-2">
          <p className="font-semibold">{comment.username}</p>
          <p>{comment.content}</p>

        </div>
      ))}

    </div>
  )
}

export default Comment;
