import { useEffect } from "react";
import styled from "styled-components";
import defaultPfp from "./static/default.jpg";

const StyledProfile = styled.div`
  max-width: fit-content;
  max-height: 250px;
  border-radius: 50%;
  box-shadow: 0 0.4px 1.5px -3px ${({ lm, black }) => (lm ? black + "33" : "transparent")},
    0 0.9px 3.6px -3px ${({ lm, black }) => (lm ? black + "25" : "transparent")},
    0 1.8px 6.8px -3px ${({ lm, black }) => (lm ? black + "22" : "transparent")},
    0 3.1px 12.1px -3px ${({ lm, black }) => (lm ? black + "18" : "transparent")},
    0 5.8px 22.6px -3px ${({ lm, black }) => (lm ? black + "14" : "transparent")},
    0 14px 54px -3px ${({ lm, black }) => (lm ? black + "11" : "transparent")};

  .frame {
    height: 250px;
    width: 250px;
    border-radius: 50%;
    overflow: hidden;
  }
  img {
    height: 250px;
  }
`;

function ProfilePicture({ lightMode, black, src, setSrc, userId }) {
  useEffect(() => {
    (async function fetchProfilePicture() {
      const photoResponse = await fetch(
        `http://localhost:3000/profile-data/${userId}`
      );
      setSrc(photoResponse.url);
    })();
  }, [setSrc, userId]);

  return (
    <StyledProfile lm={lightMode} black={black}>
      <div className="frame">
        <img src={src} alt="profile" />
      </div>
    </StyledProfile>
  );
}

export default ProfilePicture;
