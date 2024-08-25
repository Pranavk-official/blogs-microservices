// CommentList.tsx
import React, { useEffect } from "react";
import useFetchComments from "../hooks/useFetchComments";

interface CommentListProps {
  postId: string;
}

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const { comments, isLoading, error, fetchData } = useFetchComments(postId);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p>{error}</p>;

  const renderedComments = comments.map((comment) => (
    <li key={comment.id}>{comment.content}</li>
  ));

  return (
    <div className="card container">
      <h5 className="lead card-title">Comments for this post</h5>
      <ul>{renderedComments}</ul>
    </div>
  );
};

export default CommentList;
