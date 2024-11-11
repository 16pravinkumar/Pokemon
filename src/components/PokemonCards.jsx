{
  /* // subscribe to thapa technical youtube channel: https://www.youtube.com/thapatechnical */
}

export const PokemonCards = ({ pokemon }) => {
  
  return (
    <li className="pokemon-card">
      <figure>
        <img
          src={pokemon.sprites.other.dream_world.front_default}
          className="pokemon-image"
        />
      </figure>
      <h1 className="pokemon-name">{pokemon.name}</h1>
      <div className="pokemon-info pokemon-highlight">
        <p>{pokemon.types.map((heighlight) => heighlight.type.name)}</p>
      </div>

      <div className="grid-three-cols">
        <p className="pokemon-info">
          <span> Height:{pokemon.height}</span>
        </p>
        <p className="pokemon-info">
          <span> Weight:{pokemon.weight}</span>
        </p>
        <p className="pokemon-info">
          <span> speed:{pokemon.stats[0].base_stat}</span>
        </p>
      </div>

      <div className="grid-three-cols">
        <div className="pokemon-info">
          <p></p>
          <span> Experience:{pokemon.base_experience}</span>
        </div>
        <div className="pokemon-info">
          <p></p>
          <span>Attack:{pokemon.stats[1].base_stat}</span>
        </div>
        <div className="pokemon-info">
          <p></p>
          <span>
            {" "}
            Abilities:
            {pokemon.abilities
              .map((ability) => ability.ability.name).slice(0,1)
              .join(", ")}
          </span>
        </div>
      </div>
    </li>
  );
};
