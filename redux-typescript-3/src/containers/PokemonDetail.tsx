import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPokemon } from "../store/actions/pokemonActions";
import { RootStore } from "../store/store";
import _ from "lodash";
import {
  pokemonMultipleAbility,
  pokemonMultipleStat,
} from "../models/pokemonDetailModels";

const PokemonDetail = (props: any) => {
  const pokemonName: string = props.match.params.pokemon;
  const dispatch = useDispatch();
  const pokemonState = useSelector((state: RootStore) => state.Pokemon);

  useEffect(() => {
    dispatch(GetPokemon(pokemonName));
  }, [dispatch, pokemonName]);
  // eslint-disable-line react-hooks/exhaustive-deps

  const ShowData = () => {
    if (!_.isEmpty(pokemonState.data?.name)) {
      const pokeData = pokemonState.data;
      return (
        <div className={"pokemon-wrapper"}>
          <div className={"item"}>
            <h1>Sprites</h1>
            <img src={pokeData?.sprites.front_default} alt="" />
            <img src={pokeData?.sprites.back_default} alt="" />
            <img src={pokeData?.sprites.front_shiny} alt="" />
            <img src={pokeData?.sprites.back_shiny} alt="" />
          </div>
          <div className="item">
            <h1>Stats</h1>
            {pokeData?.stats.map((stat: pokemonMultipleStat, i: number) => {
              return (
                <p key={i}>
                  {stat.stat.name} {stat.base_stat}
                </p>
              );
            })}
          </div>
          <div className="item">
            <h1>Abilities</h1>
            {pokeData?.abilities.map(
              (ability: pokemonMultipleAbility, i: number) => {
                return <p key={i}>{ability.ability.name}</p>;
              }
            )}
          </div>
        </div>
      );
    }

    if (pokemonState.loading) {
      return <p>Loading...</p>;
    }

    if (pokemonState.errorMsg !== "") {
      return <p>{pokemonState.errorMsg}</p>;
    }

    return <p>error getting data</p>;
  };

  return (
    <div className={"poke"}>
      <h1>{pokemonName.toUpperCase()}</h1>
      {ShowData()}
    </div>
  );
};

export default PokemonDetail;
