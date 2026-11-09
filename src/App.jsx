import { useState } from "react";
import NameForm from './components/NameForm.jsx';
import PokemonCard from "./components/PokemonCard.jsx";
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
    let name = newCard.name;
    newCard.name = name.charAt(0).toUpperCase() + name.slice(1);
    return [...pokeCards, newCard];
  }

  function addCard(newCard) {
    setCard((pokeCards) => {
      if (pokeCards.length < 6) {
        return buildNewCardArr(newCard, pokeCards);
      }
      setNewTeamErr('Limit reached, remove a Pokemon first.');
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
        <h1>Team Builder</h1>
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
