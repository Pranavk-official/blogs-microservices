"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = require("crypto");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3002;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const commentsByPostId = {};
app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});
app.post("/posts/:id/comments", (req, res) => {
    const postId = req.params.id; // Extracting the post ID from the URL parameters
    const commentId = (0, crypto_1.randomBytes)(4).toString("hex");
    const { content } = req.body; // Corrected destructuring syntax
    // Initialize comments array for the post ID if it doesn't already exist
    if (!commentsByPostId[postId]) {
        commentsByPostId[postId] = [];
    }
    const comment = {
        id: commentId,
        content,
    };
    commentsByPostId[postId].push(comment); // Add the new comment to the post's comments array
    res.status(201).send({ id: commentId }); // Send back the ID of the newly added comment
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
