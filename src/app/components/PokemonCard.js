import React from 'react';
import { useRouter } from 'next/navigation';

const PokemonCard = ({ pokemon }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/pokemon/${pokemon?.name}`);
  };

  return (
    <div style={{ background: '#FAFAFA' }} className="relative rounded-lg shadow-md m-4 flex flex-col items-center">
      <div className='items-center' >
        <img
          src={pokemon?.sprites?.other?.['official-artwork']?.front_default}
          alt={pokemon?.name}
          className="w-32 h-32 md:w-40 md:h-40 object-contain rounded-lg mt-4"
          style={{ display: 'block', margin: 'auto' }}
        />
      </div>

      <div>
        <div className="flex flex-col">
          <h2 className="text-lg font-bold mt-2">{pokemon?.name}</h2>
          <a
            href="#"
            className="mt-12 text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
            onClick={handleClick}
          >
            Details →
          </a>
          
        </div>
      </div>

    </div>
  );
};

export default PokemonCard;
