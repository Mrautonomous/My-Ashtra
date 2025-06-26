// components/PostModal.jsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";
import useAuthStore from "../store/authStore";

const PostModal = ({ open, onClose, onSubmit, initialData = null }) => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (initialData) {
      setContent(initialData.content || "");
    }
  }, [initialData]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles.filter((f) => f.type.startsWith("image")));
    setVideos(selectedFiles.filter((f) => f.type.startsWith("video")));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("content", content);
    // Use "files" for all images and videos
    images.forEach((file) => formData.append("files", file));
    videos.forEach((file) => formData.append("files", file));
    onSubmit(formData);
    setContent("");
    setImages([]);
    setVideos([]);
    onClose();
  };

  const removeImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const removeVideo = (idx) => {
    setVideos((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[806px] bg-black">
        <div className="flex items-center gap-3">
          <Image src="/Avatar.svg" width={40} height={40} alt="user-dp" />
          <DialogHeader>
            <DialogTitle>{user.firstName}</DialogTitle>
          </DialogHeader>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What do you want to share with your customers?"
          className="w-full focus:outline-none focus:ring-0 focus:border-none border-0 p-2 rounded mt-2"
        />
        <div className="flex gap-2 mt-2 overflow-x-auto">
          {images.map((file, idx) => {
            const url = URL.createObjectURL(file);
            return (
              <div key={idx} className="relative inline-block">
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  title="Remove"
                >
                  ×
                </button>
                <Image
                  src={url}
                  alt="preview"
                  width={500}
                  height={500}
                  className="rounded mb-8"
                />
              </div>
            );
          })}
          {videos.map((file, idx) => {
            const url = URL.createObjectURL(file);
            return (
              <div key={idx} className="relative inline-block">
                <video width={500} height={500} controls className="rounded">
                  <source src={url} type={file.type} />
                </video>
                <button
                  type="button"
                  onClick={() => removeVideo(idx)}
                  className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  title="Remove"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>

        {/* Place the file upload button section here, at the end */}
        <hr />
        <div className="flex justify-between items-end">
          <label className=" flex flex-col border-0 cursor-pointer py-4 ">
            <div className="flex gap-4 justify-between items-center">
              <div className="flex gap-4">
                <div className="flex gap-3 hover:shadow-md p-2 rounded-md">
                  <Image
                    src="/gallery.svg"
                    width={20}
                    height={20}
                    alt="video"
                  />
                  <h1>Photo</h1>
                </div>
                <div className="flex gap-3 hover:shadow-md p-2 rounded-md">
                  <Image
                    src="/video-circle.svg"
                    width={20}
                    height={20}
                    alt="video"
                  />
                  <h1>Video</h1>
                </div>
              </div>
            </div>
            <span className=" font-medium"></span>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <Button
            className="mt-4 w-[98px] h-[48px] bg-[#006AFF] cursor-pointer"
            onClick={handleSubmit}
          >
            {initialData ? "Save Changes" : "Post"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;
