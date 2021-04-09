import styled from "styled-components";
import ProfilePicture from "./../../userProfile/profilePicture";
import moment from "moment";

const StyledNotification = styled.div`
  display: flex;
  padding: 8px;
  padding-right: 31px;
  border-radius: 8px;
  cursor: pointer;

  .notif-detail {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    letter-spacing: 0.5px;
    line-height: 18px;
  }
`;

function Notification({ notif, user, markRead }) {
  const sender = notif.sender.firstName + " " + notif.sender.lastName;
  const formatSentence = (type) => {
    let [receiver, action] = type.split("/");
    let sentence;

    switch (action) {
      case "add":
        sentence = " sent you a friend request.";
        break;
      case "accept":
        sentence = " accepted your friend request.";
        break;
      case "like":
        if (receiver === "post") sentence = " liked your post.";
        if (receiver === "comment") sentence = " liked your comment.";
        break;
      case "comment":
        if (receiver === "post") sentence = " replied to your post.";
        if (receiver === "comment") sentence = " replied to your comment.";
        break;
      default:
        break;
    }

    return sentence;
  };

  return (
    <StyledNotification id="notif-item" onClick={markRead(notif._id)}>
      <ProfilePicture size={"60px"} src={notif.sender.profilePhotoSrc} />
      <div className="notif-detail">
        <p>
          <b>{sender}</b>
          {formatSentence(notif.notificationType)}
        </p>
        <p>{moment(notif.createdAt).fromNow()}</p>
      </div>
    </StyledNotification>
  );
}

export default Notification;
