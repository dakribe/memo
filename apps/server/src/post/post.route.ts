import { Router } from 'express';
import { create, userPosts } from './post.controller';
import { verifyJwt } from '../middleware/verifyJwt';

const router = Router();

router.post('/', verifyJwt, create);
router.get('/:username', userPosts);

const postRoutes = router;

export default postRoutes;
