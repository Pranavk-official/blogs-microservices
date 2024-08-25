// PostCreate.tsx
import { FC, FormEvent, ChangeEvent, useState } from "react";
import axios from "axios";

const PostCreate: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null); // Feedback message

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:3001/posts", { title });
      setTitle(""); // Reset form input
      setMessage("Post created successfully!"); // Success message
    } catch (error) {
      console.error("Failed to create post:", error);
      setMessage("Failed to create post."); // Error message
    }
  };

  return (
    <div className="container my-2">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
        </div>
        <button className="my-3 btn btn-primary">Submit</button>
      </form>
      {/* Display feedback message */}
      {message && (
        <p
          className={`mt-3 ${message.includes("successfully") ? "text-success" : "text-danger"}`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default PostCreate;
