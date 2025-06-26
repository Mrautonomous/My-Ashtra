import api from "./axiosInstance";

export const fetchPosts = async ({ creatorId, page = 1, limit = 10 }) => {
  const res = await api.get(
    `/feed/posts/business/${creatorId}?page=${page}&limit=${limit}`
  );
  return res.data.data; // <-- return only the .data property!
};
export const createPost = async (formData) => {
  const res = await api.post("/feed/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const editPost = async ({ postId, data }) => {
  const res = await api.put(`/feed/posts/${postId}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deletePost = async (postId) => {
  const res = await api.delete(`/feed/posts/${postId}`);
  return res.data;
};
