// useCommentCreate.ts
import { useState } from "react";
import axios from "axios";

interface UseCommentCreateProps {
  postId: string;
}

export const useCommentCreate = ({ postId }: UseCommentCreateProps) => {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await axios.post(`http://localhost:3002/posts/${postId}/comments`, {
        content,
      });
      setContent("");
    } catch (err) {
      setError("Failed to create comment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    content,
    setContent,
    isLoading,
    error,
    createComment,
  };
};
