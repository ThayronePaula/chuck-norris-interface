import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
  FormControl,
  InputLabel,
  Input,
  MenuItem,
  Chip,
  Select,
  TextField,
  Button,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    marginBottom: 32,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
    [theme.breakpoints.down("xs")]: {
      minWidth: "95%",
    },
  },
  form: {
    [theme.breakpoints.down("xs")]: {
      minWidth: "100%",
    },
  },
  textField: {
    [theme.breakpoints.down("xs")]: {
      margin: "0 auto",
      minWidth: "95%",
    },
  },
  button: {
    [theme.breakpoints.down("xs")]: {
      minWidth: "60%",
      margin: "0 auto",
    },
  },
  JokeList: {
    width: "100%",
  },
  iconButton: {
    animation: "$go-back .8s infinite alternate",
  },

  "@keyframes go-back": {
    from: {
      transform: " translateY(10px)",
    },
    to: {
      transform: "translateY(0)",
    },
  },
  listItemEven: {
    background: "#4256af",
    color: "#fff",
  },
  listItemOdd: {
    background: "#fb8500",
  },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface ChuckJokesApi {
  type: string;
  value: [
    {
      id: number;
      joke: string;
      categories: string[];
    }
  ];
}

interface RandomCardProps {
  categories: string[] | undefined;
}

const JokeList = ({ categories }: RandomCardProps) => {
  const classes = useStyles();
  const [jokes, setJokes] = React.useState<ChuckJokesApi>();
  const [numberOfJokes, setNumberOfJokes] = React.useState(5);
  const [categorie, setCategorie] = React.useState<string[]>([]);
  const [name, setName] = React.useState("");

  const handleChangeName = async () => {
    if (name.trim().length > 0 && name.trim().indexOf(" ") >= 1) {
      const inputName = name.split(" ");
      if (inputName.length === 2) {
        try {
          const response = await fetch(
            `https://api.icndb.com/jokes/random/${jokes?.value.length}?escape=javascript&firstName=${inputName[0]}&lastName=${inputName[1]}`
          );
          const json = await response.json();
          setJokes(json);
        } catch (error) {
          console.log(error);
        }
      } else {
        setName("Please, only first and last name");
      }
    } else {
      setName("Please, only first and last name");
    }
  };
  const handleFirstAndLastName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setName(event.target.value as string);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategorie(event.target.value as string[]);
  };

  React.useEffect(() => {
    const getChuckNorrisJokes = async () => {
      if (categorie.length > 0) {
        try {
          const res = await fetch("http://api.icndb.com/jokes/count");
          const numOfJokes = await res.json();
          const response = await fetch(
            `https://api.icndb.com/jokes/random/${numOfJokes.value}?escape=javascript&limitTo=${categorie}`
          );
          const json = await response.json();
          setJokes(json);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await fetch(
            "https://api.icndb.com/jokes?escape=javascript"
          );
          const json = await response.json();
          setJokes(json);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getChuckNorrisJokes();
  }, [categorie, jokes?.value.length]);

  if (!jokes || !categories) return null;
  return (
    <Grid item xs={12} md={8} className={classes.root}>
      <Typography variant="h6">Jokes List</Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <form className={classes.form} >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gridGap={8}
          >
            <TextField
              id="outlined-textarea"
              label="First and Last name"
              placeholder="Changing the name"
              multiline
              variant="outlined"
              value={name}
              onChange={handleFirstAndLastName}
              className={classes.textField}
            />
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={handleChangeName}
              className={classes.button}
            >
              Replace name
            </Button>
          </Box>
        </form>
        <FormControl className={classes.formControl}>
          <InputLabel id="Categories">Categories</InputLabel>
          <Select
            labelId="Categories"
            id="categories"
            multiple
            value={categorie}
            onChange={handleChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected: any) => (
              <div>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {categories?.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box component="div">
        <List className={classes.JokeList}>
          {jokes?.value.slice(0, numberOfJokes).map(({ id, joke }, index) => {
            return (
              <ListItem
                key={id}
                className={
                  index % 2 === 0 ? classes.listItemEven : classes.listItemOdd
                }
              >
                <ListItemText primary={joke} />
              </ListItem>
            );
          })}
        </List>
        {jokes.value.length >= numberOfJokes ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="body2">More jokes</Typography>
            <IconButton
              className={classes.iconButton}
              onClick={() => setNumberOfJokes((number) => number + 7)}
              aria-label="Expand"
              size="medium"
            >
              <ExpandMoreIcon fontSize="inherit" />
            </IconButton>
          </Box>
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="body1">
              That's it, don't piss off chuck Norris! 😄
            </Typography>
          </Box>
        )}
      </Box>
    </Grid>
  );
};
export default JokeList;
