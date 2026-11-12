import { useState, useEffect } from "react";
import { getPokemonByName } from "../util/pokeApi.js";

export default function NameForm({ onPokeData, teamErr }) {
  const [formErr, setFormErr] = useState(null);

  useEffect(() => {
    getPokemonData("pikachu");
    getPokemonData("bulbasaur");
    getPokemonData("charmander");
  }, [])

  function handleSubmit(event) {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target));
    const name = formData.name.trim().toLowerCase();
    console.log("Form data: ", formData);
    if (!name) {
      console.log("name err")
      setFormErr("Must Enter a Name");
      return;
    }
    // Name field check passed, clear error
    setFormErr(null);
    // pass form data to async GET request
    getPokemonData(name);
    event.target.reset();
  }

  async function getPokemonData(name) {
    try {
      const data = await getPokemonByName(name);

      // TODO: create function to extract only used card data, currently storing entire api response for each card
      onPokeData(data);
      console.log("Request result:", data);
    } catch (err) {
      setFormErr(err.message);
    }
  }

  return (
    <section id='poke-lookup-container'>
      <header>
        <h2>Pokemon Lookup</h2>
      </header>
      <form onSubmit={handleSubmit} id='poke-lookup'>
        <label htmlFor='poke-name'>Pokemon Name:</label>
        <input type='text' name='name' id='poke-name' placeholder='eg: pikachu'/>
        <input type='submit' value='Search' />
        <p className="error" id="name-input-error">{formErr || teamErr}</p>
      </form>
    </section>
  )
}
