// CommentCreate.tsx
import React from "react";
import { useCommentCreate } from "../hooks/useCommentCreate";

interface CommentCreateProps {
  postId: string;
}

const CommentCreate: React.FC<CommentCreateProps> = ({ postId }) => {
  const { content, setContent, isLoading, error, createComment } =
    useCommentCreate({ postId });

  return (
    <div>
      <form onSubmit={createComment}>
        <div className="form-group">
          <label htmlFor="commentInput">New Comment</label>
          <input
            id="commentInput"
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isLoading}
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button
          type="submit"
          className="btn btn-primary my-3"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CommentCreate;
