import { NextFunction, Request, Response } from 'express';
import express from 'express';
const app = express();


// ---------------parser-------------------
app.use(express.json());
app.use(express.text());
// ----------------------------------------


// ----------------middleware--------------
const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.url, req.method, req.body, req.hostname);

    next();
}
// ----------------------------------------


const userRouter = express.Router();
const courseRouter = express.Router();
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/users', userRouter);


userRouter.post("/createUser", (req: Request, res: Response) => {
    const user = req.body;
    console.log(user);
    res.send({
        success: true,
        message: 'User created successfully',
        user: user
    })
})


courseRouter.post('/createCourse', (req: Request, res: Response) => {
    const course = req.body;
    console.log(course);
    res.json({
        success: true,
        message: 'Course has been created successfully',
        course: course
    })

})


app.get('/', logger, (req: Request, res: Response, next: NextFunction) => {
    try {
        // console.log(req.params.userId, req.params.subId);
        console.log(req.query);
        res.send(hdydt)
    }
    catch (error) {
        next(error);
    }
})


app.post('/', logger, (req: Request, res: Response) => {
    console.log(req.body);
    // res.send('got data');
    res.json({ message: 'got data' });
})


app.all('*', (req: Request, res: Response)=>{
    res.status(400).json({
        success: false,
        message: 'Invalid Route'
    })
})



// -----------------global error handler--------------
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error) {
        console.log(error);
        res.status(402).json({
            success: false,
            message: 'Attempt Failed'
        })
    }
})
// ---------------------------------------------------


export default app;