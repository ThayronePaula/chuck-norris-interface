import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  title: {
    transform: "rotate(-8deg)",
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "right",
  },
}));
const Header = () => {
  const classes = useStyles();
  return (
    <Box component="header">
      <Box component="div" width={100}>
        <Typography className={classes.title} variant="h1">
          Chuck Norris
        </Typography>
        <Typography className={classes.subtitle} variant="h2">
          Jokes
        </Typography>
      </Box>
    </Box>
  );
};
export default Header;
