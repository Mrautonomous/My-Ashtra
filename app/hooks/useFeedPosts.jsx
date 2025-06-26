import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchPosts, createPost, editPost, deletePost } from "../apis/feed";
import useAuthStore from "../../store/authStore";

export const useFeedPosts = (creatorId) => {
  const token = useAuthStore((s) => s.accessToken);

  return useInfiniteQuery({
    queryKey: ["feedPosts", creatorId],
    queryFn: ({ pageParam = 1 }) =>
      fetchPosts({ creatorId, page: pageParam, limit: 10 }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.posts?.length === 10) {
        return allPages.length + 1;
      }
      return undefined;
    },
    enabled: !!token && !!creatorId,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
    },
  });
};

export const useEditPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, data }) => editPost({ postId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
    },
  });
};
