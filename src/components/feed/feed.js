import Post from "./../post/post";

function Feed({ posts, setFeed }) {
  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <Post post={post} setFeed={setFeed} />
        </div>
      ))}
    </div>
  );
}

export default Feed;
