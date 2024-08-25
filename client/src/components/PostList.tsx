import { FC } from "react";
import { useFetchPosts } from "../hooks/useFetchPosts";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList: FC = () => {
  // Use the custom hook to fetch posts
  const posts = useFetchPosts();

  const renderedPosts = Object.values(posts).map((post) => (
    <div
      className="card"
      style={{ width: "30%", marginBottom: "20px" }}
      key={post.id}
    >
      <div className="card-body">
        <h3>{post.title}</h3>

        <CommentList postId={post.id} />
        <CommentCreate postId={post.id} />
      </div>
    </div>
  ));

  return (
    <>
      <h2>PostList</h2>
      {/* Render posts */}
      <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderedPosts}
      </div>
    </>
  );
};

export default PostList;
