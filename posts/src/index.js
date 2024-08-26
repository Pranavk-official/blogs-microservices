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
const port = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const posts = {};
app.get("/posts", (req, res) => {
    res.send(posts);
});
app.post("/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, crypto_1.randomBytes)(4).toString("hex");
    const { title } = req.body;
    console.log(req.body);
    console.log(posts);
    posts[id] = {
        id,
        title,
    };
    yield axios_1.default.post("http://localhost:3005/events", {
        type: "PostCreated",
        data: {
            id,
            title,
        },
    });
    res.status(201).send(posts[id]);
}));
app.post("/events", (req, res) => {
    console.log("Received Event", req.body.type);
    res.send({});
});
app.listen(port, () => {
    console.log(`[server]: Posts service is running at http://localhost:${port}`);
});
