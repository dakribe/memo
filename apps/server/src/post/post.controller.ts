import { Request, Response } from 'express';
import { CreatePostRequestType } from './post.schema';
import { createPost, getPosts } from './post.service';

export async function create(req: Request, res: Response) {
    const { content } = req.body as CreatePostRequestType;
    const userId = req?.user?.id;

    try {
        const post = await createPost({ content, userId });
        return res.status(201).json(post);
    } catch (e) {
        console.log(e);
        return res.status(401).json({ error: e });
    }
}

export async function userPosts(req: Request, res: Response) {
    const { username } = req.params;

    const posts = await getPosts(username);

    return res.status(201).json(posts);
}
