"use client";

export default function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-6 p-4 max-w-xl mx-auto">
      {/* Profile Header */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-gray-300" />
        <div className="flex-1 space-y-2">
          <div className="w-1/3 h-4 bg-gray-300 rounded" />
          <div className="w-1/2 h-4 bg-gray-300 rounded" />
        </div>
      </div>

      {/* Post Placeholder 1 */}
      <div className="space-y-3">
        <div className="w-full h-4 bg-gray-300 rounded" />
        <div className="w-4/5 h-4 bg-gray-300 rounded" />
        <div className="w-full h-56 bg-gray-300 rounded" />
      </div>

      {/* Post Placeholder 2 */}
      <div className="space-y-3">
        <div className="w-3/4 h-4 bg-gray-300 rounded" />
        <div className="w-2/3 h-4 bg-gray-300 rounded" />
        <div className="w-full h-40 bg-gray-300 rounded" />
      </div>
    </div>
  );
}
