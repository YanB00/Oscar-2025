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

   return (
    <section className={style.movieListContainer}>
      <h1>LIST MOVIE</h1>
      <div className={style.movieGrid}>
        <ContainerMovie>
          {movies.map((movie) => (
            <MovieCard
              key={movie.cod_filme}
              cod_filme={movie.cod_filme}
              nome_filme={movie.nome_filme}
              nome_indicado={movie.nome_indicado}
              cod_categoria={movie.cod_categoria}
              imagem={conclave} 
            />
          ))}
        </ContainerMovie>
      </div>
    </section>
  )
}

export default ListMovie;