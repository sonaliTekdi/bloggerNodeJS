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
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Login_1 = require("./entity/Login");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const JWT_SECRET = "your_jwt_secret_key"; // Replace with your own secret key
(0, typeorm_1.createConnection)()
    .then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = connection.getRepository(Login_1.Login);
    // Register a new user
    app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, password } = req.body;
        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "Username and password are required" });
        }
        const existingUser = yield userRepository.findOne({
            where: { username },
        });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = new Login_1.Login();
        user.username = username;
        user.password = hashedPassword;
        yield userRepository.save(user);
        const token = jsonwebtoken_1.default.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ token });
    }));
    // Authenticate a user
    app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, password } = req.body;
        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "Username and password are required" });
        }
        const user = yield userRepository.findOne({ where: { username } });
        if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
            return res
                .status(400)
                .json({ message: "Invalid username or password" });
        }
        const token = jsonwebtoken_1.default.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ token });
    }));
    // Middleware to verify JWT
    const authenticateToken = (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.sendStatus(401);
        }
        jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    };
    // Protected profile route
    app.get("/profile", authenticateToken, (req, res) => {
        res.status(200).json({ username: req.user.username });
    });
    const PORT = 3200;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}))
    .catch((error) => console.log(error));
