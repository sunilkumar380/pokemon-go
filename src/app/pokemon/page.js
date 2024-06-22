import React, { useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';
import usePokemon from '../hooks/usePokemon';
import Loading from '../components/Loading/Loading';
import SearchForm from '../components/SearchForm';

const Pokemon = () => {
  const {
    loading,
    pokemons,
    fetchPokemons,
    pokemonDetails,
    fetchPokemonData,
    fetchSelectedPokemon,
    selectedPokemonData,
    selectedPokemonDataLoading
  } = usePokemon();

  useEffect(() => {
    fetchPokemons({});
  }, []);

  useEffect(() => {
    fetchPokemonData(pokemons);
  }, [pokemons]);

  const handleSearch = ({ type, search }) => {
    fetchPokemons({ type, search });
  };

  return (
    <>
      <SearchForm onSearch={handleSearch} />
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {pokemonDetails.length > 0 ? (
            pokemonDetails.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))
          ) : (
            <p>No pokemon details available</p>
          )}
        </div>
      )}
    </>
  );
};

export default Pokemon;
