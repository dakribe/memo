import { useParams } from 'react-router-dom';
import { Post } from '../hooks/usePosts';
import { useEffect, useState } from 'react';

type Params = {
    username: string;
};

const getPosts = async (username: string): Promise<Post[]> => {
    const res = await fetch(`http://localhost:8000/api/posts/${username}`);
    const json = await res.json();
    return json as Post[];
};

function Profile() {
    let { username } = useParams() as Params;
    const [data, setData] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await getPosts(username);
            setData(posts);
        };
        fetchPosts();
    }, [username]);

    console.log(data);

    return (
        <div>
            <h1>{username}'s profile</h1>
            {data?.map((post) => <p>{post.content}</p>)}
        </div>
    );
}

export default Profile;
