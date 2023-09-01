import { useQuery } from '@tanstack/react-query';

export type Post = {
    id: string;
    content: string;
    authorId: string;
};

function usePosts(username: string) {
    return useQuery({
        queryKey: ['posts', username],
        queryFn: async () => {
            const res = await fetch(`http://localhost:8000/api/posts/${username}`);
            return await res.json();
        },
    });
}

export { usePosts };
