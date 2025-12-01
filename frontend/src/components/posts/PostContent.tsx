
const PostContent = ({post}:any) => {
  return (
    <div className="mb-3">
      {post.content && <p className="mb-2">{post.content}</p>}

      {post.image && (
        <img src={post.image} alt="post" className="rounded-xl w-full" />
      )}

      {post.video && (
        <video src={post.video} controls className="rounded-xl w-full" />
      )}
      
    </div>
  )
}

export default PostContent
