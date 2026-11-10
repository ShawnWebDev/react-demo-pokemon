import { useState, useEffect } from "react";
import axios from 'axios';

export default function NameForm({ onPokeData }) {
  const [formErr, setFormErr] = useState(null);

  useEffect(() => {
    getPokemonData("pikachu");
    getPokemonData("bulbasaur");
    getPokemonData("charmander");
  }, [])

  function createFormErr(err) {
    setFormErr(err);
    setTimeout(() => {
      setFormErr(null);
    }, 4000);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target));
    const name = formData.name.trim().toLowerCase();
    console.log("Form data: ", formData);
    if (!name) {
      console.log("name err")
      createFormErr("Must Enter a Name");
      return;
    }
    // pass form data to async GET request
    getPokemonData(name);
    event.target.reset();
  }

  async function getPokemonData(name) {
    try {
      const pokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = pokemonData.data;
      onPokeData(data);
      console.log("Request result:", data);
    } catch (err) {
      console.error("Request Failed:", err.message);
      alert("Error with pokemon search");
    } finally {
      console.log("Request Complete");
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
        <h6 className="error" id="name-input-error">{formErr}</h6>
      </form>
    </section>
  )
}