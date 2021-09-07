import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import Header from "./Components/Header";

const useStyles = makeStyles((theme) => ({}));
const App = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="xl">
      <Header />
    </Container>
  );
};
export default App;
