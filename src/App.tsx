import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  
}));
const App = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="xl">
      <Typography
        component="div"
        style={{ backgroundColor: "#cfe8fc", height: "100vh" }}
      />
    </Container>
  );
};
export default App;
