import { useState, useEffect } from "react";
import NameForm from "./NameForm.jsx";
import PokemonCard from "./PokemonCard.jsx";
import { getPokemonByName } from "../util/pokeApi.js";

function buildNewCardArr(newCard, prevCards) {
  const name = newCard.name.charAt(0).toUpperCase() + newCard.name.slice(1);
  return [...prevCards, { ...newCard, name }];
}

export default function PokeTeam() {
  const [pokeCards, setpokeCards] = useState([]);
  const [teamErr, setTeamErr] = useState(null);

  function setNewTeamErr(err) {
    setTeamErr(err);
    setTimeout(() => {
      setTeamErr(null);
    }, 4000);
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

  useEffect(() => {
    let ignore = false;

    ["pikachu", "bulbasaur", "charmander"].forEach(async (name) => {
      try {
        const data = await getPokemonByName(name);
        if (!ignore) setpokeCards((curr) => buildNewCardArr(data, curr));
      } catch (err) {
        if (!ignore) setTeamErr(err.message);
      }
    });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <NameForm onPokeData={addCard} teamErr={teamErr} />

      <section id="poke-container">
        <header>
          <h2>Team</h2>
        </header>

        <div id="poke-team">
          {/* testing card layout */}
          {pokeCards.length > 0 &&
            pokeCards.map((card) => (
              <PokemonCard key={card.id} pokemon={card} onRemove={removeCard} />
            ))}
        </div>
      </section>
    </>
  );
}
