import PostAction from "./PostAction"
import PostContent from "./PostContent"
import PostHeader from "./PostHeader"
const PostCard = ({post}: any) => {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <PostHeader post={post} />
      <PostContent post={post} />
      <PostAction post={post} />
      
      
    </div>
  )
}

export default PostCard


