import Like from "./Like";
import Comment from "./Comment";

const PostAction = ({post}:any) => {
  return (
    <div>
      <Like post={post}></Like>
      <Comment postId={post.id}></Comment>
    </div>
  )
}

export default PostAction;

