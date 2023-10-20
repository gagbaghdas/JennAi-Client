import React from 'react';
import NavigationBar from "../main/NavigationBar";
import { styled } from '@mui/material/styles';

const Container = styled('div')({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "rgb(227 251 255)",
});

function Layout({ children }) {
  return (
    <Container>
      <NavigationBar />
      {children}
    </Container>
  );
}

export default Layout;
