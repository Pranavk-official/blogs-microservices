// hooks/useFetchComments.ts (changed from .tsx to .ts)
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface Comment {
  id: string;
  content: string;
}

const useFetchComments = (postId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get<Comment[]>(
        `http://localhost:3002/posts/${postId}/comments`,
      );
      setComments(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch comments.");
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { comments, isLoading, error, fetchData };
};

export default useFetchComments;
