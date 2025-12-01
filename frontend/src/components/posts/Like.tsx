import { useLike } from "@/lib/react-query/useLike";
import { Heart } from "lucide-react";

const Like = ({post}:any) => {
  const {LikeMutation} = useLike(post.id);

  const handleLike = () => {
    LikeMutation.mutate();
  }
  

  return (
    <button onClick={handleLike} className="flex items-center gap-2">
      <Heart className={`w-6 h-6 transition-all duration-150 ${post.is_liked ?  "fill-red-500 text-red-500" : "text-gray-600"}`}/>
      <span>{post.likes_count}</span>
    </button>
  )
}

export default Like;
