import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    margin: "2rem auto",
  },
  media: {
    height: 400,
  },
}));

interface ChuckJokeApi {
  type: string;
  value: {
    id: number;
    joke: string;
    categories: string[];
  };
}

interface ChuckImages {
  images: [{ url: string }];
}

interface RandomCardProps {
  categories: string[] | undefined;
}

const RandomJoke = ({ categories }: RandomCardProps) => {
  const classes = useStyles();
  const [randomJoke, setRandomJoke] = React.useState<ChuckJokeApi>();
  const [chuckImage, setChuckImage] = React.useState<ChuckImages>();

  const handleRandomNerdyJoke = async () => {
    try {
      const response = await fetch(
        `https://api.icndb.com/jokes/random?escape=javascript&limitTo=${
          categories && categories[1]
        }`
      );
      const json = await response.json();
      setRandomJoke(json);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRandomExplicitJoke = async () => {
    try {
      const response = await fetch(
        `https://api.icndb.com/jokes/random?escape=javascript&limitTo=${
          categories && categories[0]
        }`
      );
      const json = await response.json();
      setRandomJoke(json);
    } catch (error) {
      console.log(error);
    }
  };

  const getChuckNorrisJoke = async () => {
    try {
      const response = await fetch(
        `https://api.icndb.com/jokes/random?escape=javascript`
      );
      const json = await response.json();
      setRandomJoke(json);
    } catch (error) {
      console.log(error);
    }
  };

  const getChuckNorrisImages = async () => {
    try {
      const response = await fetch("./chuckNorris.json", {
        headers: {
          Accept: "application/json",
        },
      });
      const json = await response.json();
      setChuckImage(json);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getChuckNorrisJoke();
    getChuckNorrisImages();
  }, []);

  if (!randomJoke || !chuckImage || !categories) return null;
  const num = Math.floor(Math.random() * chuckImage.images.length);
  return (
    <Card className={classes.root}>
      <Typography
        variant="body2"
        color="textSecondary"
        component="p"
        align="center"
      >
        Click on Chuck Norris's image for a random joke
      </Typography>
      <CardActionArea onClick={getChuckNorrisJoke}>
        <CardMedia
          className={classes.media}
          image={chuckImage.images[num].url}
          title="Random Chunck Norris Image"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {randomJoke.value.joke}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            size="small"
            color="primary"
            onClick={handleRandomExplicitJoke}
          >
            Random {categories[0]} joke
          </Button>
          <Button size="small" color="primary" onClick={handleRandomNerdyJoke}>
            Random {categories[1]} joke
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};
export default React.memo(RandomJoke);
