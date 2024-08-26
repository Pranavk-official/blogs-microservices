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
const crypto_1 = require("crypto");
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3002;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const commentsByPostId = {};
app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});
app.post("/posts/:id/comments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    const commentId = (0, crypto_1.randomBytes)(4).toString("hex");
    const { content } = req.body;
    const comments = commentsByPostId[postId] || [];
    const comment = {
        id: commentId,
        content,
        status: "pending",
    };
    comments.push(comment);
    commentsByPostId[postId] = comments;
    console.log(comments);
    yield axios_1.default.post("http://localhost:3005/events", {
        type: "CommentCreated",
        data: {
            id: commentId,
            content,
            postId,
            status: "pending",
        },
    });
    res.status(201).send(comments);
}));
app.post("/events", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received Event", req.body.type);
    console.log(req.body.data);
    const { type, data } = req.body;
    if (type === "CommentModerated") {
        const { postId, id, status, content } = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find((comment) => comment.id === id);
        console.log(comment);
        if (comment) {
            comment.status = status;
            yield axios_1.default.post("http://localhost:3005/events", {
                type: "CommentUpdated",
                data: {
                    id,
                    postId,
                    status,
                    content,
                },
            });
        }
    }
    res.send({ status: "OK" });
}));
app.listen(port, () => {
    console.log(`[server]: Comments service is running at http://localhost:${port}`);
});
