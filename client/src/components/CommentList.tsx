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
  console.log(comments);
  const renderedComments = comments.map((comment) => {
    let content;

    console.log(comment);

    if (comment.status === "approved") {
      content = comment.content;
    } else if (comment.status === "pending") {
      content = "This comment is awaiting moderation";
    } else if (comment.status === "rejected") {
      content = "This comment has been rejected";
    }

    return (
      <li className="m-2" key={comment.id}>
        {content}
      </li>
    );
  });

  return (
    <div className="card container">
      <h5 className="card-title">Comments for this post</h5>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul className="card-body card m-2 container bg-primary-light">
          {renderedComments}
        </ul>
      )}
    </div>
  );
};

export default CommentList;
