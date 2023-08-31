import { Router } from 'express';
import { signIn, signUp } from './user.controller';
import { verifyJwt } from '../middleware/verifyJwt';

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/secret', verifyJwt, (req, res) => {
    return res.status(201).json({ message: `Hello ${req.user.username}` });
});

const userRoutes = router;

export default userRoutes;
