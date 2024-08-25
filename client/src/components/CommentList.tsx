// CommentList.tsx
import React from "react";

interface Comment {
  id: string;
  content: string;
  status: "approved" | "rejected" | "pending";
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    const { id, content } = comment;
    return <li key={id}>{content}</li>;
  });

  return (
    <div className="card container">
      <h5 className="card-title">Comments for this post</h5>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul className="card container bg-primary-light">{renderedComments}</ul>
      )}
    </div>
  );
};

export default CommentList;
