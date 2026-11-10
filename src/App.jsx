import { useState } from "react";
import NameForm from './components/NameForm.jsx';
import PokemonCard from "./components/PokemonCard.jsx";
import './App.css';

function App() {
  const [pokeCards, setpokeCards] = useState([]);
  const [teamErr, setTeamErr] = useState(null);
  const [heading, setHeading] = useState("Team Builder");

  function setNewTeamErr(err) {
    setTeamErr(err);
    setTimeout(() => {
      setTeamErr(null);
    }, 4000);
  }

  // set up use effect for pokeCards -> if starter selected...

  function buildNewCardArr(newCard, prevCards) {
    for (const card of prevCards) {
      if (card.id === newCard.id) {
        setNewTeamErr('Already have this card.');
        return prevCards;
      }
    }
    const name = newCard.name.charAt(0).toUpperCase() + newCard.name.slice(1);
    return [...prevCards, { ...newCard, name }];
  }

  function addCard(newCard) {
    setpokeCards((pokeCards) => {
      if (pokeCards.length < 6) {
        return buildNewCardArr(newCard, pokeCards);
      }
      setNewTeamErr('Limit reached, remove a Pokemon first.');
      return pokeCards;
    });
  }

  function removeCard(cardId) {
    setpokeCards((pokeCards) => {
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
        <h1>{heading}</h1>
        <button type="button" onClick={() => setHeading('Team Builder... Day 2')}></button>
      </header>

      <main>
        <NameForm onPokeData={addCard} />

        <section id='poke-container'>
          <header>
            <h2>Team</h2>
            <p className="error" id="team-error">{teamErr}</p>
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
