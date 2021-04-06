import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import colors from "./../../colors";
const { black } = colors;

const StyledProfile = styled.div`
  max-width: fit-content;
  max-height: ${({ size }) => size};
  border-radius: 50%;
  box-shadow: 0 0.4px 1.5px -3px ${({ lm, black }) => (lm ? black + "33" : "transparent")},
    0 0.9px 3.6px -3px ${({ lm, black }) => (lm ? black + "25" : "transparent")},
    0 1.8px 6.8px -3px ${({ lm, black }) => (lm ? black + "22" : "transparent")},
    0 3.1px 12.1px -3px ${({ lm, black }) => (lm ? black + "18" : "transparent")},
    0 5.8px 22.6px -3px ${({ lm, black }) => (lm ? black + "14" : "transparent")},
    0 14px 54px -3px ${({ lm, black }) => (lm ? black + "11" : "transparent")};

  .frame {
    height: ${({ size }) => size};
    width: ${({ size }) => size};
    border-radius: 50%;
    overflow: hidden;
    background-color: #eee;
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

function ProfilePicture({
  userId,
  size,
  lightMode,
  needsUpdate,
  setUpdateStatus,
  src,
}) {
  const fullSrc = "http://localhost:3000/" + src;

  return (
    <StyledProfile lm={lightMode} black={black} size={size}>
      <div className="frame">
        {<img src={fullSrc} alt="profile" loading="lazy" /> || <Skeleton />}
      </div>
    </StyledProfile>
  );
}

export default ProfilePicture;
