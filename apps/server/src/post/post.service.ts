import db from '../utils/db';
import { CreatePostType } from './post.schema';

export async function createPost(data: CreatePostType) {
    const { content, userId } = data;
    return await db.post.create({
        data: {
            content: content,
            author: {
                connect: {
                    id: userId,
                },
            },
        },
    });
}
