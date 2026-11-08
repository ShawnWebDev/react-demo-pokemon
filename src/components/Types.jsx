export default function PokemonTypeList() {

  const getPokemonTypes = async () => {
    try {
       const pokemonData = await axios.get('https://pokeapi.co/api/v2/type');
       console.log(pokemonData);
    } catch (err) {
      console.error("Request Failed:", err.message);
      alert("Error with pokemon type search");
    }
  }

    return (
      <div>
        <h2>Pokemon Types:</h2>
        <ul id='type-list'></ul>
      </div>
    );
}
