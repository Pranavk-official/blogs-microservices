import { useState, useEffect } from "react";
import axios from "axios";

// Define the structure of a single post
interface PostType {
  id: string;
  title: string;
}

// Custom hook to fetch posts
export const useFetchPosts = (): { [key: string]: PostType } => {
  const [posts, setPosts] = useState<{ [key: string]: PostType }>({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get<{ [key: string]: PostType }>(
          "http://localhost:3001/posts",
        );
        setPosts(res.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return posts;
};
