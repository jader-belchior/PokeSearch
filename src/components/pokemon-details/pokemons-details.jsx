import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPokemonDetails } from "../../services/pokemon-service";
import {
  UpperCaseh3,
  AbContainer,
  ImgDiv,
  MovAbContainer,
  MovesContainer,
} from "../../Styles/pokemons-details-style";

export const PokemonDetails = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const getPokemonDetails = async () => {
      const details = await fetchPokemonDetails(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      setPokemon(details);
    };

    getPokemonDetails();
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div>
        <UpperCaseh3>{pokemon.name}</UpperCaseh3>

        {pokemon.typeArray.length == 1 && pokemon.typeArray[0]}

        {pokemon.typeArray.length > 1 && pokemon.typeArray.join(" | ")}
      </div>
      <ImgDiv>
        <img
          src={pokemon.imgUrl}
          alt={`${pokemon.name} image`}
          style={{ maxWidth: "100%" }}
        />
      </ImgDiv>
      <MovAbContainer>
        <MovesContainer>
          <UpperCaseh3>Moves</UpperCaseh3>
          <div>
            {pokemon.movesArray.map((move, index) => (
              <span key={index}>{move}</span>
            ))}
          </div>
        </MovesContainer>

        <AbContainer>
          <UpperCaseh3>Abilities</UpperCaseh3>
          {pokemon.abilitiesNames &&
            pokemon.abilitiesNames.map((name, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {name}
                {hoveredIndex === index && (
                  <div>
                    {pokemon.abilitiesDetails && pokemon.abilitiesDetails[index]
                      ? pokemon.abilitiesDetails[index].description ||
                        "Ability description not found"
                      : "Ability not found on API"}
                  </div>
                )}
              </div>
            ))}
        </AbContainer>
      </MovAbContainer>
    </section>
  );
};
