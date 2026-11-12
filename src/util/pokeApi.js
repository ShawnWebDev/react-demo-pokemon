import axios from 'axios';


export async function getPokemonByName(name) {
  try {
    const pokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return pokemonData.data;
  } catch (err) {
    console.error("Request Failed:", err.message);
    throw new Error("Search failed, try again.");
  }
}

export async function getRandomPokemonByType(type) {
  // TODO
}
