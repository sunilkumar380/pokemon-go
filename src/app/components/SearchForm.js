// components/SearchForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchForm = ({ onSearch }) => {
  const [types, setTypes] = useState([]);
  const [type, setType] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/type');
      setTypes(response.data.results);
    };
    fetchTypes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ type, search });
  };

  return (
    <form onSubmit={handleSubmit} className="ml-6">
      <div className="mb-3">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 border rounded mr-2 w-80"
        >
          <option value="" disabled={true}>All Types</option>
          {types.map((t) => (
            <option key={t.name} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Pokémon"
          className="p-2 border rounded mr-2 w-80"
        />
        <button type="submit" className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
