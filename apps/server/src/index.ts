import express from 'express';
import userRoutes from './user/user.route';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { User } from '@prisma/client';
import postRoutes from './post/post.route';

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}

app.get('/', (req, res) => {
    return res.json('Hello world');
});

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.listen(8000, () => {
    console.log('Server running on port 8000');
});
