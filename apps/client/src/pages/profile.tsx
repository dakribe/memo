import { useParams } from 'react-router-dom';
import { Post, usePosts } from '../hooks/usePosts';

type Params = {
    username: string;
};

function Profile() {
    let { username } = useParams() as Params;

    const { data } = usePosts(username);

    return <div>{data?.map((post: Post) => <h1 key={post.id}>{post.content}</h1>)}</div>;
}

export default Profile;
