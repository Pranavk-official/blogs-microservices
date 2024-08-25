"use strict";
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
const port = process.env.PORT || 3005;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/events", (req, res) => {
    const event = req.body;
    axios_1.default.post("http://localhost:3001/events", event);
    axios_1.default.post("http://localhost:3002/events", event);
    axios_1.default.post("http://localhost:3003/events", event);
    res.send({ status: "OK" });
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
