// hooks/usePokemon.js
import { useState } from 'react';
import axios from 'axios';

const usePokemon = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [selectedPokemonData, setSelectedPokemonData] = useState([]);
  const [selectedPokemonDataLoading, setSelectedPokemonDataLoading] = useState(false);

  const fetchPokemons = async ({ type, search }) => {
    setLoading(true);
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=100';
    
    if (type) {
      url = `https://pokeapi.co/api/v2/type/${type}`;
    }
  
    try {
      const response = await axios.get(url);
      let results = type ? response.data.pokemon.map(p => p.pokemon) : response.data.results;
  
      if (search) {
        results = results.filter(p => p.name.includes(search.toLowerCase()));
      }
  
      setPokemons(results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pokemons:', error);
      setLoading(false);
    }
  };
  
  const fetchPokemonData = async (pokemon) => {
    let pokemonsData = [];
    let promises = [];
    
    for (let i = 0; i < pokemon.length; i++) {
      promises.push(
        axios.get(pokemon[i].url).then(response => {
          pokemonsData.push(response.data);
        })
      );
    }
  
    await Promise.all(promises);
    setPokemonDetails(pokemonsData);
  };
  

  const fetchSelectedPokemon = async(name) => {
    setSelectedPokemonDataLoading(true);
    try {
      let url = `https://pokeapi.co/api/v2/pokemon/${name}/`;
      await axios.get(url).then(response => {
        setSelectedPokemonData(response.data);
        setSelectedPokemonDataLoading(false);
      });
      } catch (e) {
        setSelectedPokemonDataLoading(false);
        console.log(error.response.data.error)
    }

  };
  return { pokemons, fetchPokemons, loading, pokemonDetails, fetchPokemonData, selectedPokemonData, fetchSelectedPokemon, selectedPokemonDataLoading };
};

export default usePokemon;
