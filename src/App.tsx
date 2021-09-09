import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Header from "./Components/Header";
import JokeList from "./Components/JokeList";
import RandomJoke from "./Components/RandomJoke";

const useStyles = makeStyles((theme) => ({}));
interface CategoriesJoke {
  type: string;
  value: string[];
}
const App = () => {
  const classes = useStyles();
  const [categories, setCategories] = React.useState<CategoriesJoke>();
  React.useEffect(() => {
    const getChuckNorrisJokes = async () => {
      try {
        const response = await fetch("http://api.icndb.com/categories");
        const json = await response.json();
        setCategories(json);
      } catch (error) {
        console.log(error);
      }
    };
    getChuckNorrisJokes();
  }, []);
  return (
    <Container maxWidth="xl">
      <Header />
      <RandomJoke categories={categories?.value} />
      <JokeList categories={categories?.value} />
    </Container>
  );
};
export default App;
