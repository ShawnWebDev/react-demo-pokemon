import { useState } from "react";
import PokemonTypeList from './components/Types.jsx';
import NameForm from './components/NameForm.jsx';
import './App.css';

function App() {
  const [pokeCards, setCard] = useState([]);
  const [teamErr, setTeamErr] = useState(null);

  function setNewTeamErr(err) {
    setTeamErr(err);
  }

  function buildNewCardArr(newCard, pokeCards) {
    for (const card of pokeCards) {
      if (card.id === newCard.id) {
        setNewTeamErr('Already have this card.');
        return pokeCards;
      }
    }
    console.log("newCard", newCard);
    let name = newCard.name;
    newCard.name = name.charAt(0).toUpperCase() + name.slice(1);
    return [...pokeCards, newCard];
  }

  function addCard(newCard) {
    setCard((pokeCards) => {
      if (pokeCards.length < 6) {
        return buildNewCardArr(newCard, pokeCards);
      }
      setNewTeamErr('Limit reached, remove one first.');
      return pokeCards;
    });
  }

  function removeCard(cardId) {
    setCard((pokeCards) => {
      if (pokeCards.length >= 1) {
        return pokeCards.filter((card) => card.id !== cardId);
      }
      return pokeCards;
    })
  }


  return (
    <>
      <header id='main-header'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original" alt='pokemon logo' />
        <h1>bb</h1>
      </header>

      <main>
        <NameForm onPokeData={addCard} />

        <section id='poke-container'>

          <header>
            <h2>Team</h2>
            <p className="error">{teamErr}</p>
          </header>
          <div id="poke-team">
            {/* testing card layout */}
            {pokeCards.length > 0 && (
              pokeCards.map((card) => (
                <PokemonCard key={card.id} pokemon={card} onRemove={removeCard} />
              ))
            )}
          </div>
        </section>
      </main>
    </>
  )
}

export default App;

function PokemonCard({ pokemon, onRemove }) {
  return (
    <div className='card'>
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
          <img src={pokemon.sprites.front_default} />
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
