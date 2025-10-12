import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Fetch function
const fetchPosts = async () => {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return data;
};

function PostsComponent() {
  // Use React Query to fetch posts
  const {
    data: posts,
    error,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 60000, // cache valid for 1 minute
  });

  // Loading state
  if (isLoading) {
    return <p className="text-gray-600 text-lg">Loading posts...</p>;
  }

  // Error state
  if (isError) {
    return <p className="text-red-600">Error: {error.message}</p>;
  }

  return (
    <div className="w-full max-w-3xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Posts List
        </h2>
        <button
          onClick={() => refetch()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
        >
          {isFetching ? "Refreshing..." : "Refetch Posts"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {posts.slice(0, 10).map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-lg font-bold text-blue-800">{post.title}</h3>
            <p className="text-gray-600 mt-2">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostsComponent;
