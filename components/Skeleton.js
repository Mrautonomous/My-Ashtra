"use client";
import React from "react";

const SkeletonPost = () => {
  return (
    <div className="animate-pulse border shadow w-xl gap-4 h-[442px] p-4 rounded-[12px] bg-gray-100">
      <div className="flex gap-3 items-center mb-4">
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="flex flex-col gap-2">
          <div className="w-32 h-4 bg-gray-300 rounded"></div>
          <div className="w-24 h-3 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
      <div className="w-5/6 h-4 bg-gray-300 rounded mb-4"></div>
      <div className="w-full h-[323px] bg-gray-300 rounded"></div>
    </div>
  );
};

export default SkeletonPost;
