import React from "react";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Feed from "./../feed/feed";

function UserProfile(props) {
  const match = useRouteMatch();
  const { userId } = match.params;

  return <Feed user={userId} />;
}

export default UserProfile;
