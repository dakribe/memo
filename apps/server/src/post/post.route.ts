import { Router } from 'express';
import { create } from './post.controller';
import { verifyJwt } from '../middleware/verifyJwt';

const router = Router();

router.post('/', verifyJwt, create);

const postRoutes = router;

export default postRoutes;
