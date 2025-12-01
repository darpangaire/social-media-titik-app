

const PostHeader = ({post}:any) => {
  return (
    <div className="flex items-center gap-3 mb-3">
      <img src={post.profile_picture} 
      className="w-10 h-10 rounded-full object-cover" alt={post.username} />
      <p className="font-semibold">{post.username}</p>
      
    </div>
  )
}

export default PostHeader;


