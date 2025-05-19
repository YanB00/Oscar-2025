import React, {useEffect,useState} from "react";

import MovieCard from '../MovieCard';
import ContainerMovie from '../layout/ContainerMovie';

import conclave from '../../../assets/conclave.jpg';
import style from   './ListMovie.module.css';

const ListMovie = ()=>{
    const [movies, setMovies] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/listagemFilmes',{
            method: 'GET',
            mode:'cors',
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Headers':'*',
            }
        })
        .then((resp)=>resp.json())
.then((movieData) => {
    console.log(movieData);
    if (movieData && movieData.data) {
        setMovies(movieData.data);
    } else {
        console.error("API retornou dados em formato inesperado:", movieData);
        setMovies([]);
    }
})
    },[])

    return(
        <section className={style.movieListContainer}> {/* Aplique a classe no container da lista */}
            <h1>LIST MOVIE</h1>
            <div className={style.movieGrid}>
            <ContainerMovie>
                {
                    movies.map((movie)=>(
                        <div className={style.movieCard} key={movie.cod_filme}> {/* Envolva cada MovieCard com a div estilizada */}
                            <img src={conclave} alt={movie.nome_filme} />
                            <h3>{movie.nome_filme}</h3>
                            <p>Indicado: {movie.nome_indicado}</p>
                            <button>Ver Detalhes</button>
                        </div>
                    ))
                }
            </ContainerMovie>
             </div>
        </section>
    )
}

export default ListMovie