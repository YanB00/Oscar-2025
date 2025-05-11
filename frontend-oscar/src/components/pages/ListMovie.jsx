import React, {useEffect,useState} from "react";

import MovieCard from '../MovieCard';
import ContainerMovie from '../layout/ContainerMovie';

const ListMovie = ()=>{
    const [movies, setMovies] = useState([]);

    useEffect(()=>{
        fetch('http://127.0.0.1:5000/listagemFilmes',{
            method: 'GET',
            mode:'cors',
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Headers':'*',
            }
        })
        .then((resp)=>resp.json())
        .then((movieData)=>{
            console.log(movieData.data);
            setBooks(movieData.data);
        })
        .catch((err)=>{console.log(err)});

    },[])

    return(
        <section>
            <h1>LIST MOVIE</h1>
            <ContainerMovie>
                {
                    movies.map((movie)=>(
                        <MovieCard
                        nome_filme={movie.nome_filme}
                        nome_indicado={movie.nome_indicado}
                        key={movie.cod_categoria}
                        />
                    ))
                }
            </ContainerMovie>
        </section>
    )
}

export default ListMovie
