import axios from 'axios';
import './App.css';

function App() {
  // Will be refactoring to use state later..

  const handleSubmit = (event) => {
      event.preventDefault()
      const formData = Object.fromEntries(new FormData(event.target));
      const name = formData.name.trim().toLowerCase();
      console.log("Form data: ", formData);
      if (!name) return;
      // pass form data to async GET request
      getPokemonData(name);
      event.target.reset();
  } 

  // .then.catch (chained callback functions - bleh)
/* const getPokemonData = (name) => {
    const pokemonData = axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((res) => console.log(res.data))
        .catch((err) => console.error("reqest failed:", err.message))
        .finally(() => console.log("Request Complete"))
    generatePokeCard(pokemonData);
  } */

  // cleaner async function with try/catch 
  const getPokemonData = async (name) => {
    let pokemonData;
    try {
      pokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      generatePokeCard(getRelevantCardData(pokemonData));
    } catch (err) {
      console.error("Request Failed:", err.message);
      alert("Error with pokemon search");
    } finally {
      console.log("Request Complete. Data: ", pokemonData);
    }
  } 

  const getPokemonTypes = async () => {
    try {
       const pokemonData = await axios.get(`https://pokeapi.co/api/v2/type`);
       console.log(pokemonData);
       buildPokemonTypeArray(pokemonData);
    } catch (err) {
      console.error("Request Failed:", err.message);
      alert("Error with pokemon type search");
    }
  }

  const buildPokemonTypeArray = (pokemonData) => {
    const pokemonTypeList = document.getElementById('type-list');
    pokemonTypeList.innerHTML = '';
    for (const obj of pokemonData.data.results) {
        const listItem = document.createElement('li');
        listItem.textContent = `${obj.name}`;
        pokemonTypeList.appendChild(listItem);
        //pokemonTypes.push(obj);
    }
  }

  const getRelevantCardData = (apiData) => {
    const relevantData = {
      "name": apiData.data.name,
      "img": apiData.data.sprites.front_default,
    }

    return relevantData;
  }

  const generatePokeCard = (relevantData) => {
    const container = document.getElementById('poke-container');
    const card = document.createElement('div');
    const name = document.createElement('h3');
    const img = document.createElement('img');

    card.classList.add('card');
    name.textContent = relevantData.name;
    img.src = relevantData.img;
    card.appendChild(name);
    card.appendChild(img);
    container.appendChild(card);
  }

  //let pokemonTypes = [];

  return (
    <>  
      <header>
        <h1 className='hello'>Pokemon Project</h1>
      </header>
      <div>
        <h2>Show Pokemon Type:</h2>
        <button onClick={getPokemonTypes}>Types</button>
        <ul id='type-list'></ul>
      </div>
      <form id='poke-lookup' onSubmit = {handleSubmit}>
        <header>
          <h2>Pokemon Lookup</h2>
        </header>

        <label htmlFor='name'>Pokemon Name:</label>
        <input type='text' name='name' id='pokemon-name' placeholder='pikachu'/>

        <input type='submit' value='Search'/>

      </form>

      <section id='poke-display'>
        <header>
          <h2>"Caught" Pokemon</h2>
        </header>

        <div id='poke-container'></div>
      </section>
    </>
  )
}

export default App
