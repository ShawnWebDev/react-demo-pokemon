const TYPE_COLOR_MAP = {
  normal: "aab09f",
  steel: "89a1b0",
  dark: "736c75",
  poison: "b468b7",
  psychic: "e5709b",
  ghost: "846ab6",
  fairy: "e397d1",
  water: "539ae2",
  ice: "70cbd4",
  grass: "71c558",
  bug: "94bc4a",
  electric: "e5c531",
  dragon: "6a7baf",
  rock: "b2a061",
  ground: "cc9f4f",
  flying: "7da6de",
  fire: "ea7a3c",
  fighting: "cb5f48",
};

function PokemonCard({ pokemon, onRemove }) {
  return (
    <div className="card" id={pokemon.name + "-card"}>
      <div className="card-header-stat_container">
        <header className="card_header">
          <p>{pokemon.name}</p>
          <sub>
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                style={{
                  backgroundColor: `#${TYPE_COLOR_MAP[type.type.name]}`,
                }}
                className="card_type-name"
              >
                {type.type.name}
              </span>
            ))}
          </sub>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name + " card image"}
          />
        </header>
        <div className="card_stats">
          <sub>Base Stats</sub>
          <ul>
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
          <button
            onClick={() => onRemove(pokemon.id)}
            className="remove_card_btn"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
