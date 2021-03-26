export default function getCommentCount(postComments) {
  if (!postComments) return 1;

  return postComments.reduce((total, current) => {
    return total + (1 + current.comments?.length);
  }, 0);
}
