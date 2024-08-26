import { useState, useEffect } from "react";
import axios from "axios";

type Comment = {
  id: string;
  content: string;
  status: "approved" | "rejected" | "pending";
};

// Define the structure of a single post
interface PostType {
  id: string;
  title: string;
  comments: Comment[];
}

// Custom hook to fetch posts
export const useFetchPosts = (): { [key: string]: PostType } => {
  const [posts, setPosts] = useState<{ [key: string]: PostType }>({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get<{ [key: string]: PostType }>(
          "http://localhost:4006/posts"
        );
        console.log(posts);
        setPosts(res.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return posts;
};
