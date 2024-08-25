import { PostCreate, PostList } from "./components";

function App() {
  return (
    <>
      <div className="container my-4">
        <h1>Create a Post</h1>
        <PostCreate />
        <hr />
        <PostList />
      </div>
    </>
  );
}

export default App;
