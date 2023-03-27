import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 16px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: black;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Title> 🧩 Puzzle</Title>
    </HeaderWrapper>
  );
};

export default Header;
