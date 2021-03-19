import Post from "./../post/post";

function Feed({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
}

export default Feed;
