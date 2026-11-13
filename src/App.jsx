import { useState } from "react";
import NameForm from "./components/NameForm.jsx";
import PokemonCard from "./components/PokemonCard.jsx";
import "./App.css";

function App() {
  const [pokeCards, setpokeCards] = useState([]);
  const [teamErr, setTeamErr] = useState(null);

  function setNewTeamErr(err) {
    setTeamErr(err);
    setTimeout(() => {
      setTeamErr(null);
    }, 4000);
  }

  function buildNewCardArr(newCard, prevCards) {
    const name = newCard.name.charAt(0).toUpperCase() + newCard.name.slice(1);
    return [...prevCards, { ...newCard, name }];
  }

  function addCard(newCard) {
    setpokeCards((currCards) => {
      // Check for dupliates using current cards
      for (const card of currCards) {
        if (card.id === newCard.id) {
          setNewTeamErr("This Pokemon is already on your team.");
          return currCards;
        }
      }
      // Check for team limit
      if (currCards.length >= 6) {
        setNewTeamErr(
          "Limit reached (6), you must remove a Pokemon to add another.",
        );
        return currCards;
      }
      // Checks pass, reset teamErr
      setTeamErr(null);
      // Create new card
      return buildNewCardArr(newCard, currCards);
    });
  }

  function removeCard(cardId) {
    setpokeCards((currCards) => {
      return currCards.filter((card) => card.id !== cardId);
    });
  }

  return (
    <>
      <header id="main-header">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
          alt="pokemon logo"
        />
        <h1>Team Builder</h1>
      </header>

      <main>
        <NameForm onPokeData={addCard} teamErr={teamErr} />

        <section id="poke-container">
          <header>
            <h2>Team</h2>
          </header>

          <div id="poke-team">
            {/* testing card layout */}
            {pokeCards.length > 0 &&
              pokeCards.map((card) => (
                <PokemonCard
                  key={card.id}
                  pokemon={card}
                  onRemove={removeCard}
                />
              ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
