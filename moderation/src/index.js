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
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3004;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/events", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, data } = req.body;
    console.log(`Event Recieved: ${type}, ${data}`);
    if (type === "CommentCreated") {
        const status = data.content.includes("orange") ? "rejected" : "approved";
        yield axios_1.default.post("http://localhost:3005/events", {
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
}));
app.listen(port, () => {
    console.log(`[server]: Moderation service is running at http://localhost:${port}`);
});
