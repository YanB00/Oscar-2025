import React, { useEffect, useState } from "react";

import MovieCard from '../MovieCard';
import ContainerMovie from '../layout/ContainerMovie';
import style from './ListCategory.module.css';

import conclave from '../../../assets/conclave.jpg'; // Assuming default movie image

const ListCategory = () => {
    const [categories, setCategories] = useState([]);
    const [movies, setMovies] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null); // Stores the ID of the selected category
    const [loadingMovies, setLoadingMovies] = useState(false); // State for loading indicator
    const [errorMovies, setErrorMovies] = useState(null); // State for movie fetching errors
    const [loadingCategories, setLoadingCategories] = useState(false); // State for category loading
    const [errorCategories, setErrorCategories] = useState(null); // State for category fetching errors


    const API_BASE_URL = 'http://localhost:5000';

    // Effect to fetch all categories when the component mounts
    useEffect(() => {
        setLoadingCategories(true);
        setErrorCategories(null);
        fetch(`${API_BASE_URL}/listagemCategoria`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
        })
        .then((resp) => resp.json())
        .then((categoryData) => {
            console.log("Categories API response:", categoryData);
            if (categoryData && categoryData.data) {
                setCategories(categoryData.data);
            } else {
                console.error("API de categorias retornou dados em formato inesperado:", categoryData);
                setCategories([]);
                setErrorCategories('Formato de dados de categorias inesperado.');
            }
        })
        .catch((err) => {
            console.error("Erro ao buscar categorias:", err);
            setCategories([]);
            setErrorCategories('Erro de rede ou servidor ao carregar categorias.');
        })
        .finally(() => {
            setLoadingCategories(false);
        });
    }, []); // Empty dependency array means this runs once on component mount

    // Function to fetch movies based on category ID
    const fetchMoviesByCategory = (categoryId) => {
        setSelectedCategory(categoryId); // Update selected category state
        setMovies([]); // Clear movies before fetching new ones
        setLoadingMovies(true); // Set loading to true
        setErrorMovies(null); // Clear previous errors

        fetch(`${API_BASE_URL}/listagemFilmes/categoria/${categoryId}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
        })
        .then(async (resp) => {
            if (!resp.ok) {
                const errorBody = await resp.json(); // Assuming all non-OK responses are JSON
                console.error(`Erro na resposta da API (${resp.status}):`, errorBody);

                // Specific handling for 404 with "Nenhum filme encontrado para esta categoria."
                if (resp.status === 404 && errorBody.mensageStatus === 'Nenhum filme encontrado para esta categoria.') {
                    setMovies([]); // Ensure movies are cleared
                    setErrorMovies(null); // Clear any error, as this is an "expected" 404
                    return Promise.reject('No movies found for this category - treated as empty list.'); // Reject to stop .then chain
                } else {
                    setErrorMovies(errorBody.mensageStatus || `Erro: ${resp.status}`);
                    return Promise.reject(`Erro na requisição: ${resp.status}`); // Reject the promise to trigger catch
                }
            }
            return resp.json();
        })
        .then((movieData) => {
            console.log(`Movies for category ${categoryId} API response:`, movieData);
            if (movieData && movieData.data) {
                setMovies(movieData.data);
            } else {
                console.warn(`Dados de filme inesperados para a categoria ${categoryId}:`, movieData);
                setMovies([]);
                setErrorMovies('Formato de dados de filmes inesperado.');
            }
        })
        .catch((err) => {
            // Only set a generic error if it's not the "no movies found" rejection
            if (err !== 'No movies found for this category - treated as empty list.') {
                console.error(`Erro ao buscar filmes para a categoria ${categoryId}:`, err);
                if (!errorMovies) { // Avoid overwriting specific error messages set above
                    setErrorMovies('Erro de rede ou servidor ao carregar filmes.');
                }
            }
            // If it was the "no movies found" rejection, movies are already [] and error is null
        })
        .finally(() => {
            setLoadingMovies(false); // Always set loading to false after fetch completes
        });
    };

    return (
        <div className={style.pageContainer}>
            <aside className={style.sidebar}>
                <h2>Categorias</h2>
                {loadingCategories && <p>Carregando categorias...</p>}
                {errorCategories && <p className={style.errorMessage}>Erro: {errorCategories}</p>}
                {!loadingCategories && !errorCategories && (
                    <ul>
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <li key={category.cod_categoria}>
                                    <button
                                        onClick={() => fetchMoviesByCategory(category.cod_categoria)}
                                        className={selectedCategory === category.cod_categoria ? style.activeCategory : ''}
                                    >
                                        {category.nome_categoria}
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li>Nenhuma categoria encontrada.</li>
                        )}
                    </ul>
                )}
            </aside>

            <main className={style.mainContent}>
                <h1>
                    {selectedCategory === null
                        ? 'Selecione uma Categoria'
                        : categories.find(cat => cat.cod_categoria === selectedCategory)?.nome_categoria || 'Filmes por Categoria'}
                </h1>

                {loadingMovies && <p>Carregando filmes...</p>}
                {/* Only show error if errorMovies is truly an error (not a "no movies found" scenario) */}
                {errorMovies && <p className={style.errorMessage}>Erro: {errorMovies}</p>}

                {!loadingMovies && !errorMovies && (
                    <ContainerMovie>
                        {movies.length > 0 ? (
                            movies.map((movie) => (
                                <MovieCard
                                    key={movie.cod_filme}
                                    cod_filme={movie.cod_filme}
                                    nome_filme={movie.nome_filme}
                                    nome_indicado={movie.nome_indicado}
                                    cod_categoria={movie.cod_categoria}
                                    imagem={conclave} // Use your default image
                                />
                            ))
                        ) : (
                            // Display "Nenhum filme para exibir nesta categoria." when no movies are found and no hard error
                            <p>{selectedCategory === null ? 'Nenhuma categoria selecionada.' : 'Nenhum filme para exibir nesta categoria.'}</p>
                        )}
                    </ContainerMovie>
                )}
            </main>
        </div>
    );
};

export default ListCategory;