import { useEffect, useState } from "react";
import { PokemonCards } from "../components/PokemonCards";

export const Pokemon = () => {
  const [allPokemonsData, setAllPokemonsData] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=300";

  const fetchingAllPokemonData = async () => {
    setLoading(true);
    try {
      const response = await fetch(API);
      const data = await response.json();

      // Sort the data based on the sort order
      const sortedData = data.results.sort((a, b) => {
        if (sort === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });

      setAllPokemonsData(sortedData);
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  const fetchCurrentPagePokemon = async () => {
    setLoading(true);
    try {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      const pokemonData = allPokemonsData.slice(startIndex, endIndex);

      const detailedPokemonList = await Promise.all(
        pokemonData.map(async (singlePokemon) => {
          const response = await fetch(`${singlePokemon.url}`);
          const data = await response.json();
          return data;
        })
      );

      setPokemonData(detailedPokemonList);
      setLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };

  let filteredItem = pokemonData.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(search.toLowerCase());
  });
  // console.log(pokemonData)

  useEffect(() => {
    fetchingAllPokemonData();
  }, [sort]);

  useEffect(() => {
    if (allPokemonsData.length > 0) {
      fetchCurrentPagePokemon(); // Fetch Pokémon details for the current page
    }
  }, [allPokemonsData, page]);

  const handleNextPage = () => {
    if (page < Math.ceil(allPokemonsData.length / itemsPerPage)) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) {
    return (
      <div className="loader">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  } else
    return (
      <>
        <section className="container">
          <header>
            <h1> Lets Catch Pokémon</h1>
          </header>
          <div className="pokemon-search-sort">
            <input
              type="text"
              placeholder="search Pokemon"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              name="sort"
              id=""
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="" disabled>
                Sort by
              </option>
              <option value="asc">A to Z</option>
              <option value="desc">Z to A</option>
            </select>
          </div>
          <div>
            <ul className="cards">
              {filteredItem.map((pokemon, index) => {
                return <PokemonCards key={index} pokemon={pokemon} />;
              })}
            </ul>
          </div>

          <div className="pagination-controls">
            <button onClick={handlePreviousPage} disabled={page === 1}>
              Previous
            </button>
            <span>Page {page} of {Math.ceil(allPokemonsData.length / itemsPerPage)}</span>
            <button
              onClick={handleNextPage}
              disabled={
                page >= Math.ceil(allPokemonsData.length / itemsPerPage)
              }
            >
              Next
            </button>
          </div>
        </section>
      </>
    );
};
