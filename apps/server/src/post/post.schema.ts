import { Output, object, string } from 'valibot';

const createPostSchema = object({
    userId: string(),
    content: string(),
});

export type CreatePostType = Output<typeof createPostSchema>;

const createPostRequestSchema = object({
    content: string(),
});

export type CreatePostRequestType = Output<typeof createPostRequestSchema>;
