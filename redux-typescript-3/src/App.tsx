import React from "react";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import PokemonDetail from "./containers/PokemonDetail";
import PokemonList from "./containers/PokemonList";

//https://www.youtube.com/watch?v=GbAENvrGbDo&ab_channel=LetsCode

function App() {
  return (
    <div className="App">
      <nav>
        <NavLink to={"/"}>Search</NavLink>
      </nav>
      <Switch>
        <Route path={"/"} exact component={PokemonList} />
        <Route path={"/pokemon/:pokemon"} exact component={PokemonDetail} />
        <Redirect to={"/"} />
      </Switch>
    </div>
  );
}

export default App;
