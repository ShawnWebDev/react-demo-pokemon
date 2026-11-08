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

  const buildNewCardArr = (newCard, pokeCards) => {
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
            <h2>Cards</h2>
          </header>
          <p className="error">{}</p>
          <div id="poke-team">
            {/* testing card layout */}
            {pokeCards.length > 0 && (
              pokeCards.map((card) => (
                <PokemonCard key={card.id} pokemon={card} />
              ))
            )}
          </div>
        </section>
      </main>
    </>
  )
}

export default App;

function PokemonCard({ pokemon }) {
  return (
    <div className='card'>
      <header className="card_header">
        <p>
          <span>{pokemon.name}</span><span>hp</span>
        </p>
      </header>
      img
      <br />
      attributes?
    </div>
  )
}
