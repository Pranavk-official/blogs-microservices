import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4006;

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

const handleEvent = (type: string, data: any) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  } else if (type === "CommentCreated") {
    const { id: commentId, content, postId, status } = data;
    const post = posts[postId];
    if (post) {
      post.comments.push({ id: commentId, content, status });
    }
  } else if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    if (post) {
      const comment = post.comments.find((comment) => comment.id === id);
      if (comment) {
        comment.status = status;
        comment.content = content;
      }
    }
    console.log(post.comments);
  } else {
    console.log(`Unhandled event type: ${type}`);
  }
};

app.get("/posts", (req: Request, res: Response) => {
  console.log(posts);
  res.send(posts);
});

app.post("/events", (req: Request, res: Response) => {
  const { type, data } = req.body;

  console.log(type, data);

  handleEvent(type, data);

  res.send({ status: "OK" });
});

app.listen(port, async () => {
  console.log(`[server]: Query service is running at http://localhost:${port}`);

  const response = await axios.get("http://localhost:3005/events");

  console.log(`Processing Event: ${response.data.length}`);
  for (let event of response.data) {
    console.log(`Processing Event: ${event.type}`);
    handleEvent(event.type, event.data);
  }
});
