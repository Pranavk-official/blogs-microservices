import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

type CommentType = {
  id: string;
  content: string;
  status: "pending" | "approved" | "rejected";
};

type PostType = {
  id: string;
  title: string;
  comments: CommentType[];
};

const posts: { [key: string]: PostType } = {};

app.get("/posts", (req: Request, res: Response) => {
  res.send(posts);
});

app.post("/events", (req: Request, res: Response) => {
  const { type, data } = req.body;

  switch (type) {
    case "PostCreated":
      const { id, title } = data;
      posts[id] = { id, title, comments: [] };
      break;

    case "CommentCreated":
      const { id: commentId, content, postId, status } = data;
      const post = posts[postId];
      if (post) {
        post.comments.push({ id: commentId, content, status });
      }
      break;

    default:
      console.log(`Unhandled event type: ${type}`);
  }

  res.send({ status: "OK" });
});

app.listen(port, () => {
  console.log(`[server]: Query service is running at http://localhost:${port}`);
});
