import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());

app.post("/events", async (req: Request, res: Response) => {
  const { type, data } = req.body;

  console.log(`Event Recieved: ${type}, ${data}`);

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://localhost:3005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        content: data.content,
        status,
      },
    });

    res.send({});
  }
});

app.listen(port, () => {
  console.log(
    `[server]: Moderation service is running at http://localhost:${port}`
  );
});
