import axios from 'axios'
import './App.css'

function App() {

  const handleSubmit = (event) => {
      event.preventDefault()
      const formData = Object.fromEntries(new FormData(event.target));
      const name = formData.name.trim().toLowerCase();
      console.log("Form data: ", formData);
      if (!name) return;
      getPokemonData(name);
      event.target.reset()
  } 

  // .then .catch
/*   const getPokemonData = (name) => {
    const pokemonData = axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((res) => console.log(res.data))
        .catch((err) => console.error("reqest failed:", err.message))
        .finally(() => console.log("Request Complete"))
    generatePokeCard(pokemonData);
  } */

  const getPokemonData = async (name) => {
    let pokemonData;
    try {
      pokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      generatePokeCard(pokemonData);
    } catch (err) {
      console.error("Request Failed:", err.message);
      alert("Error with pokemon search")
    } finally {
      console.log("Request Complete. Data: ", pokemonData)
    }
  } 

  const generatePokeCard = (apiData) => {
    const container = document.getElementById('poke-container');
    const card = document.createElement('div');
    const name = document.createElement('h3');

    card.classList.add('card');
    name.textContent = apiData.data.name;
    card.appendChild(name);
    container.appendChild(card);
  }
 
  return (
    <>  
      <header>
        <h1 className='hello'>Pokemon Project</h1>
      </header>

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
