/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchAllPokemon,
  fetchPokemonMainDetails,
  fetchPokemonTypes,
} from "../../services/pokemon-service";
import { Button } from "../generalized-button/button";
import { Card, PokeList, TypeList } from "../../Styles/pokemon-list-style";

// Exibe informações no card
const PokemonCard = ({ pokemonDetails, isVisible }) => {
  return (
    <Card  isVisible={isVisible}>
      <Link to={`/pokemon/${pokemonDetails.id}`}>
        <div>
          <img
            src={pokemonDetails.imgUrl}
            alt={`${pokemonDetails.name} image`}
          />
        </div>
        <h3>{pokemonDetails.name || "Nome do pokemon não encontrado"}</h3>
      </Link>
    </Card>
  );
};

export const PokemonList = () => {
  const [pokemons, setPokemons] = useState(() => {
    const savedPokemons = localStorage.getItem("pokemons");
    return savedPokemons ? JSON.parse(savedPokemons) : [];
  });

  const [numberShownPokemon, setNumberShownPokemon] = useState(() => {
    const savedNumber = localStorage.getItem("numberShownPokemon");
    return savedNumber ? parseInt(savedNumber, 10) : 10;
  });

  const [shownPokemon, setShownPokemon] = useState([]);

  const [selectedTypes, setSelectedTypes] = useState(() => {
    const savedTypes = localStorage.getItem("selectedTypes");
    return savedTypes ? JSON.parse(savedTypes) : [];
  });

  const [pokemonTypes, setPokemonTypes] = useState(() => {
    const savedTypes = localStorage.getItem("types");
    return savedTypes ? JSON.parse(savedTypes) : [];
  });

  const [visibleIndexes, setVisibleIndexes] = useState([]);

  // define todos os pokemons
  useEffect(() => {
    const fetchData = async () => {
      if (pokemons.length === 0) {
        const fetchedPokemons = await fetchAllPokemon();
        setPokemons(fetchedPokemons);
        localStorage.setItem("pokemons", JSON.stringify(fetchedPokemons));
      }
    };
    fetchData();
  }, [pokemons]);

  // Define tipos de pokemon
  useEffect(() => {
    const fetchTypes = async () => {
      if (pokemonTypes.length === 0) {
        const types = await fetchPokemonTypes();
        setPokemonTypes(types);
        localStorage.setItem("types", JSON.stringify(types));
      }
    };
    fetchTypes();
  }, [pokemonTypes]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (pokemons.length > 0) {
        try {
          let filteredPokemons = pokemons;

          // Verifica o filtro aplicado
          if (selectedTypes.length > 0) {
            filteredPokemons = pokemons.filter((pokemon) =>
              selectedTypes.every(
                (type) => pokemon.types.includes(type) // Verifica se pokemon.types inclui todos os tipos selecionados
              )
            );
          }

          const pokemonToFetch = filteredPokemons.slice(0, numberShownPokemon);

          // pega detalhes dos pokemons filtrados
          const pokemonDetails = await Promise.all(
            pokemonToFetch.map((pokemon) =>
              fetchPokemonMainDetails(pokemon.url)
            )
          );

          setShownPokemon(pokemonDetails);

          // Exibe os cards com atraso
        pokemonDetails.forEach((_, index) => {
          const globalIndex = index + visibleIndexes.length; // Índice global
          setTimeout(() => {
            setVisibleIndexes((prev) => [...prev, globalIndex]);
          }, globalIndex * 150); // Atraso proporcional ao índice global
        });

        } catch (error) {
          console.error("Failed to fetch pokemon details:", error);
        }
      }
    };

    fetchDetails();
  }, [numberShownPokemon, pokemons, selectedTypes]);

  // Mostra pokemons de 10 em 10
  const showMorePokemon = () => {
    setNumberShownPokemon((prevShownPokemon) => {
      const newNumber = prevShownPokemon + 10;
      localStorage.setItem("numberShownPokemon", newNumber);
      return newNumber;
    });
  };

  // mostra menos pokemons de 10 em 10
  const showLessPokemon = () => {
    setNumberShownPokemon((prevShownPokemon) => {
      if (prevShownPokemon > 10) {
        const newNumber = prevShownPokemon - 10;
        localStorage.setItem("numberShownPokemon", newNumber);
        return newNumber;
      }
    });
  };

  // Handler por tipo
  const handleTypeChange = (event) => {
    const { value, checked } = event.target;
    setSelectedTypes((prevSelectedTypes) => {
      const newSelectedTypes = checked
        ? [...prevSelectedTypes, value]
        : prevSelectedTypes.filter((type) => type !== value);

      // Salva os tipos selecionados no localStorage
      localStorage.setItem("selectedTypes", JSON.stringify(newSelectedTypes));

      return newSelectedTypes;
    });
  };

  return (
    <section>
      <div>
        <label>Filter by type: </label>
        <TypeList>
          {pokemonTypes
            .filter((type) => type !== "unknown" && type !== "stellar") // filtra tipos inexistentes
            .sort((a, b) => a.localeCompare(b)) // ordena alfabeticamente
            .map((type) => (
              <label key={type}>
                <input
                  type="checkbox"
                  value={type}
                  checked={selectedTypes.includes(type)}
                  onChange={handleTypeChange}
                />
                {type}
              </label>
            ))}
        </TypeList>
      </div>

      <PokeList>
        {shownPokemon.length === 0 ? (
          <p>Loading Pokémons...</p>
        ) : (
          shownPokemon.map((pokemon, index) => (
            <PokemonCard pokemonDetails={pokemon} key={pokemon.id} isVisible={visibleIndexes.includes(index)}/>
          ))
        )}
      </PokeList>
      {numberShownPokemon < pokemons.length && (
        <div>
          {numberShownPokemon > 11 && (
            <Button onClick={showLessPokemon} style={{ margin: "10px" }}>
              Show less
            </Button>
          )}
          <Button onClick={showMorePokemon} style={{ margin: "10px" }}>
            Load More
          </Button>
        </div>
      )}
    </section>
  );
};
