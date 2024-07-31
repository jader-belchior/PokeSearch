import axios from "axios";
import pLimit from 'p-limit';

const limit = pLimit(15); // Define o número máximo de requisições simultâneas

// Get ALL pokemon filtering details
async function fetchAllPokemon() {
  try {
    // Get list of all pokemons
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=5000'); 
    const pokemonList = response.data.results;

    // Function to fetch details of a single Pokémon
    const fetchPokemonDetails = async (pokemon) => {
      const details = await axios.get(pokemon.url);
      return {
        name: pokemon.name,
        url: pokemon.url,
        types: details.data.types.map(typeInfo => typeInfo.type.name)
      };
    };

    // Use p-limit to control concurrency
    const detailedPokemonPromises = pokemonList.map(pokemon => 
      limit(() => fetchPokemonDetails(pokemon))
    );

    // Await all promises before returning them
    const detailedPokemonList = await Promise.all(detailedPokemonPromises);
    return detailedPokemonList;

  } catch (error) {
    console.log(`Unexpected error in fetchAllPokemon: ${error}`);
    return [];
  }
}

// Função para obter todos os tipos de Pokémon
export const fetchPokemonTypes = async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/type');
    return response.data.results.map((type) => type.name);
  } catch (error) {
    console.log(`Unexpected error in fetchPokemonTypes: ${error}`);
    return [];
  }
};

// Função para obter detalhes das habilidades
async function fetchAbilitiesDetails(abilitiesArray) {
  try {
    return await Promise.all(
      abilitiesArray.map(async (element) => {
        const response = await axios.get(element.ability.url);
        const descriptionEntry = response.data.effect_entries.find(
          (entry) => entry.language.name === "en"
        );
        const description = descriptionEntry ? descriptionEntry.effect : "No description available";
        return {
          name: element.ability.name,
          description,
        };
      })
    );
  } catch (error) {
    console.log(`Unexpected error in fetchAbilitiesDetails: ${error}`);
    return [];
  }
}

// Função para obter detalhes principais do Pokémon
async function fetchPokemonDetails(pokemonUrl) {
  try {
    const response = await axios.get(pokemonUrl);
    const pokemon = response.data;

    const name = pokemon.name;
    const id = pokemon.id;
    const imgUrl = pokemon.sprites.other["official-artwork"].front_default;
    const typeArray = pokemon.types.map(type => type.type.name);
    const movesArray = pokemon.moves.map(move => move.move.name);
    const abilitiesArray = pokemon.abilities;
    const abilitiesNames = pokemon.abilities.map(
      (ability) => ability.ability.name
    );
    const abilitiesDetails = await fetchAbilitiesDetails(abilitiesArray);

    return {
      name,
      imgUrl,
      typeArray,
      movesArray,
      abilitiesNames,
      abilitiesDetails,
      id
    };
  } catch (error) {
    console.log(`Unexpected error in fetchPokemonDetails: ${error}`);
    return {};
  }
}

// Função para obter detalhes principais do Pokémon (sem habilidades e movimentos)
async function fetchPokemonMainDetails(pokemonUrl) {
  try {
    const response = await axios.get(pokemonUrl);
    const pokemon = response.data;

    const name = pokemon.name;
    const id = pokemon.id;
    const imgUrl = pokemon.sprites.other["official-artwork"].front_default;
    const typeArray = pokemon.types.map(type => type.type.name);

    return {
      name,
      imgUrl,
      id,
      typeArray
    };
  } catch (error) {
    console.log(`Unexpected error in fetchPokemonMainDetails: ${error}`);
    return {};
  }
}

export {
  fetchAllPokemon,
  fetchAbilitiesDetails,
  fetchPokemonDetails,
  fetchPokemonMainDetails
};
