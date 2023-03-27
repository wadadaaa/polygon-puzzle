import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 50px;
    padding: 0;
    background-color: #ffffff;
    font-family: "Martian Mono","Consolas","Bitstream Vera Sans Mono","Courier New","Courier",monospace;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0 auto;
`;

const Main = styled.main`
  flex: 1;
  padding: 30px 0;
  max-width: 1200px;
  align-self: center;
`;

const DefaultLayout = ({ children }) => (
  <>
    <GlobalStyle />
    <Container>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Container>
  </>
);

export default DefaultLayout;
