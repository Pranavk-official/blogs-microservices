"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3003;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const posts = {};
app.get("/posts", (req, res) => {
    res.send(posts);
});
app.post("/events", (req, res) => {
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
