import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/react-query/axiosInstance";


export function useInfinitePosts() {
  return useInfiniteQuery({
    queryKey: ["posts"],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get(`/post/posts/?page=${pageParam}`);
      return res.data;
    },
    getNextPageParam: (lastPage: any) => {
      return lastPage.next_page ?? undefined;
    },
  });
};



