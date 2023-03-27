import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 16px;
`;

const FooterText = styled.p`
  font-size: 14px;
  color: #000000;
`;

const Footer = () => (
  <FooterContainer>
    <FooterText>&copy; 2023 Puzzle. All rights reserved.</FooterText>
  </FooterContainer>
);

export default Footer;
