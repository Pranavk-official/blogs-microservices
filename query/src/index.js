"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4006;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const posts = {};
const handleEvent = (type, data) => {
    if (type === "PostCreated") {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }
    else if (type === "CommentCreated") {
        const { id: commentId, content, postId, status } = data;
        const post = posts[postId];
        if (post) {
            post.comments.push({ id: commentId, content, status });
        }
    }
    else if (type === "CommentUpdated") {
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
    }
    else {
        console.log(`Unhandled event type: ${type}`);
    }
};
app.get("/posts", (req, res) => {
    console.log(posts);
    res.send(posts);
});
app.post("/events", (req, res) => {
    const { type, data } = req.body;
    console.log(type, data);
    handleEvent(type, data);
    res.send({ status: "OK" });
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`[server]: Query service is running at http://localhost:${port}`);
    const response = yield axios_1.default.get("http://localhost:3005/events");
    console.log(`Processing Event: ${response.data.length}`);
    for (let event of response.data) {
        console.log(`Processing Event: ${event.type}`);
        handleEvent(event.type, event.data);
    }
}));
