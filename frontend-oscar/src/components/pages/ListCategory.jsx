import React, { useEffect, useState } from "react";

import MovieCard from '../MovieCard';
import ContainerMovie from '../layout/ContainerMovie';
import style from './ListCategory.module.css';

import conclave from '../../../assets/conclave.jpg'; 

const ListCategory = () => {
    const [categories, setCategories] = useState([]);
    const [movies, setMovies] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null); 
    const [loadingMovies, setLoadingMovies] = useState(false); 
    const [errorMovies, setErrorMovies] = useState(null); 
    const [loadingCategories, setLoadingCategories] = useState(false); 
    const [errorCategories, setErrorCategories] = useState(null); 

    const API_BASE_URL = 'http://localhost:5000';

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
    }, []); 

    const fetchMoviesByCategory = (categoryId) => {
        setSelectedCategory(categoryId);
        setMovies([]); 
        setLoadingMovies(true);
        setErrorMovies(null); 

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
                const errorBody = await resp.json(); 
                console.error(`Erro na resposta da API (${resp.status}):`, errorBody);

                if (resp.status === 404 && errorBody.mensageStatus === 'Nenhum filme encontrado para esta categoria.') {
                    setMovies([]); 
                    setErrorMovies(null); 
                    return Promise.reject('No movies found for this category - treated as empty list.'); 
                } else {
                    setErrorMovies(errorBody.mensageStatus || `Erro: ${resp.status}`);
                    return Promise.reject(`Erro na requisição: ${resp.status}`); 
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
            if (err !== 'No movies found for this category - treated as empty list.') {
                console.error(`Erro ao buscar filmes para a categoria ${categoryId}:`, err);
                if (!errorMovies) { 
                    setErrorMovies('Erro de rede ou servidor ao carregar filmes.');
                }
            }
        })
        .finally(() => {
            setLoadingMovies(false); 
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
                                    imagem={conclave} 
                                />
                            ))
                        ) : (
                            // Display "Nenhum filme para exibir nesta categoria."
                            <p>{selectedCategory === null ? 'Nenhuma categoria selecionada.' : 'Nenhum filme para exibir nesta categoria.'}</p>
                        )}
                    </ContainerMovie>
                )}
            </main>
        </div>
    );
};

export default ListCategory;