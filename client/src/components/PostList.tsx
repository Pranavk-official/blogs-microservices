import { FC } from "react";
import { useFetchPosts } from "../hooks/useFetchPosts";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList: FC = () => {
  // Use the custom hook to fetch posts
  const posts = useFetchPosts();
  console.log(posts);

  const renderedPosts = Object.values(posts).map((post) => (
    <div
      className="card col col-md-6 m-3"
      style={{ width: "30%", marginBottom: "20px" }}
      key={post.id}
    >
      <div className="card-body">
        <h3>{post.title}</h3>

        <CommentList comments={post.comments} />
        <CommentCreate postId={post.id} />
      </div>
    </div>
  ));

  return (
    <>
      <h2>PostList</h2>
      {/* Render posts */}
      <div className="row">{renderedPosts}</div>
    </>
  );
};

export default PostList;
