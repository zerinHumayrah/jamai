"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// ---------------parser-------------------
app.use(express_1.default.json());
app.use(express_1.default.text());
// ----------------------------------------
// ----------------middleware--------------
const logger = (req, res, next) => {
    console.log(req.url, req.method, req.body, req.hostname);
    next();
};
// ----------------------------------------
const userRouter = express_1.default.Router();
const courseRouter = express_1.default.Router();
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/users', userRouter);
userRouter.post("/createUser", (req, res) => {
    const user = req.body;
    console.log(user);
    res.send({
        success: true,
        message: 'User created successfully',
        user: user
    });
});
courseRouter.post('/createCourse', (req, res) => {
    const course = req.body;
    console.log(course);
    res.json({
        success: true,
        message: 'Course has been created successfully',
        course: course
    });
});
app.get('/', logger, (req, res, next) => {
    try {
        // console.log(req.params.userId, req.params.subId);
        console.log(req.query);
        res.send(hdydt);
    }
    catch (error) {
        next(error);
    }
});
app.post('/', logger, (req, res) => {
    console.log(req.body);
    // res.send('got data');
    res.json({ message: 'got data' });
});
app.all('*', (req, res) => {
    res.status(400).json({
        success: false,
        message: 'Invalid Route'
    });
});
// -----------------global error handler--------------
app.use((error, req, res, next) => {
    if (error) {
        console.log(error);
        res.status(402).json({
            success: false,
            message: 'Attempt Failed'
        });
    }
});
// ---------------------------------------------------
exports.default = app;
