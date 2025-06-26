//feeds/page.jsx

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import SkeletonPost from "../../components/Skeleton";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/authStore";
import {
  useFeedPosts,
  useCreatePost,
  useEditPost,
  useDeletePost,
} from "../hooks/useFeedPosts.jsx";
import PostModal from "../../components/PostModal";
import toast from "react-hot-toast";

function Feeds() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const creatorId = user?.businessId;
  const [openDropdown, setOpenDropdown] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFeedPosts(creatorId);

  const createPost = useCreatePost({
    onSuccess: () => {
      toast.success("Post Created Successfully");
      setModalOpen(false);
      setEditData(null);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create post");
    },
  });
  const editPost = useEditPost({
    onSuccess: () => {
      toast.success("Post Updated Successfully");
      setModalOpen(false);
      setEditData(null);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update post");
    },
  });
  const deletePost = useDeletePost({
    onSuccess: () => {
      toast.success("Post Deleted Successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete post");
    },
  });

  const hasHydrated = useAuthStore((state) =>
    typeof state.hasHydrated === "boolean" ? state.hasHydrated : false
  );

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.push("/emailandpass");
    }
  }, [isAuthenticated, hasHydrated, router]);

  const handleCreatePost = (formData) => {
    createPost.mutate(formData);
  };

  const handleEditPost = (post) => {
    setEditData(post); // Open modal in edit mode
    setModalOpen(true);
  };

  const handleEditSubmit = (formData) => {
    if (!editData) return;
    editPost.mutate({ postId: editData.id, data: formData });
  };

  const handleDeletePost = (postId) => {
    deletePost.mutate(postId);
  };

  const toggleDropdown = (postId) => {
    setOpenDropdown(openDropdown === postId ? null : postId);
  };

  if (!hasHydrated || isLoading) {
    return (
      <>
        <div className="flex flex-col justify-center items-center gap-8">
          <Navbar />
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center gap-5">
        {/* New post input box */}
        <div className="w-[582px] border-[1px] border-[#E6E8EB] shadow rounded-xl p-[16px] mt-[41px] mb-[16px]">
          <h1 className="font-bold text-xl">New post</h1>
          <div
            className="flex items-center gap-3 content-center h-[100px] cursor-pointer"
            onClick={() => {
              setEditData(null); // We're creating, not editing
              setModalOpen(true); // Open modal
            }}
          >
            <Image src="/Avatar.svg" width={40} height={40} alt="user-dp" />
            <div className="cursor-text text-lg text-[#7B7B7B] flex-1 bg-transparent  border-gray-300 px-4 py-2 rounded-md">
              Start post here...
            </div>
          </div>
          <hr className="shadow align-text-bottom mt-3" />
          <div className="flex gap-10 mt-2 items-center">
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="cursor-pointer flex gap-3 hover:shadow-lg p-1 rounded-md"
                onClick={() => {
                  setEditData(null);
                  setModalOpen(true);
                }}
              >
                <Image src="/gallery.svg" width={20} height={20} alt="photo" />
                <h1 className="align-middle">Photo</h1>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="cursor-pointer flex gap-3 hover:shadow-lg p-1 rounded-md"
                onClick={() => {
                  setEditData(null);
                  setModalOpen(true);
                }}
              >
                <Image
                  src="/video-circle.svg"
                  width={20}
                  height={20}
                  alt="video"
                />
                <h1>Video</h1>
              </button>
            </div>
          </div>
        </div>

        {/* Posts */}
        {data?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {(Array.isArray(page.posts) ? page.posts : []).map((post) => (
              <div
                key={post.id}
                className="border shadow w-xl h-auto min-h-[442px] p-4 rounded-[12px]"
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-1.5 items-center">
                    <div className="gap-[3px]">
                      <Image
                        src="/Avatar.svg"
                        width={32}
                        height={32}
                        alt="avatar"
                      />
                    </div>
                    <div>
                      <h1 className="font-medium mb-[3px]">{user.firstName}</h1>
                      <div className="flex justify-center items-center gap-2">
                        <h3 className="text-xs text-[#565B62]">
                          {new Date(post.createdAt).toLocaleString()}
                        </h3>
                        <h2 className="text-[12px] font-medium">
                          {post?.type === "sponsored" ? "sponsored" : " "}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <Image
                      src="/Vector.svg"
                      width={4}
                      height={15}
                      alt="dots"
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(post.id);
                      }}
                    />
                    {/* Dropdown Menu */}
                    {openDropdown === post.id && (
                      <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[170px]">
                        <button
                          onClick={() => handleEditPost(post)}
                          className="w-full px-4 py-2 text-left text-sm
                        text-gray-700 hover:bg-gray-100 rounded-t-lg flex
                        items-center gap-2"
                        >
                          Edit post
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-b-lg flex items-center gap-2"
                        >
                          Delete post
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <p className="m-3 ml-0">{post.content}</p>
                <Image
                  src={post.images?.[0] || "/Avatar.svg"}
                  width={550}
                  height={323}
                  alt="post-image"
                  className="rounded-md"
                />
              </div>
            ))}
          </React.Fragment>
        ))}

        {/* Load More Button */}
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="mt-6 px-6 py-2 bg-[#E6E8EB] text-black rounded-md"
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </button>
        )}

        {!hasNextPage && !isLoading && (
          <p className="text-gray-500 my-4">No more posts to load.</p>
        )}
      </main>
      <PostModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditData(null);
        }}
        onSubmit={editData ? handleEditSubmit : handleCreatePost}
        initialData={editData}
      />
    </>
  );
}

export default Feeds;
