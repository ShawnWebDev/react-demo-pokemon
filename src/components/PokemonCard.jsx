function PokemonCard({ pokemon, onRemove }) {
  return (
    <div className='card' id={pokemon.name + "-card"}>
      <div className="card-header-stat_container">
        <header className="card_header">
          <p>{pokemon.name}</p>
          <sub>
            {pokemon.types.map((type, idx) => (
              <span key={type.type.name}>
                {type.type.name}
                {idx < pokemon.types.length - 1 && " / "}
              </span>
            ))}
          </sub>
          <img src={pokemon.sprites.front_default} alt={pokemon.name + " card image"}/>
        </header>
        <div className="card_stats">
          <sub>Base Stats</sub>
          <ul>
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
            ))}
          </ul>
          <button onClick={() => onRemove(pokemon.id)}>Remove</button>
        </div>
      </div>
    </div>
  )
}

export default PokemonCard;