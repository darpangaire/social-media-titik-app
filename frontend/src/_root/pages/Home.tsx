import PostCard from "@/components/posts/PostCard";
import { useInfinitePosts } from "@/lib/react-query/useInfinitePosts";
import InfiniteScroll from "react-infinite-scroll-component";



const Home = () => {
  const {data,fetchNextPage, hasNextPage} = useInfinitePosts();

  const posts = data?.pages.flatMap((page) => page.results) || [];

  return (
    <InfiniteScroll dataLength={posts.length}
    next={fetchNextPage} hasMore={!!hasNextPage}
    loader={<p className="text-center py-4">Loading...</p>}>
      <div className="space-y-4 max-w-xl mx-auto">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    
    
    </InfiniteScroll>
  )
}

export default Home;

