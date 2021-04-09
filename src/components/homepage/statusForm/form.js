import ProfilePicture from "./../../userProfile/profilePicture";

function Form(props) {
  const {
    handleSubmit,
    src,
    currentUser,
    handleInputChange,
    text,
    postRef,
  } = props;

  return (
    <form onSubmit={handleSubmit} className="txt-form">
      <div className="wrap">
        <div className="pfp">
          <ProfilePicture src={src} userId={currentUser} size={"37px"} />
        </div>
        <input
          type="text"
          onChange={handleInputChange}
          value={text}
          ref={postRef}
        />
        <div className="placeholder" id={text ? "moved" : " "}>
          What's on your mind?
        </div>
      </div>
      <p>Press enter to post</p>
    </form>
  );
}

export default Form;
