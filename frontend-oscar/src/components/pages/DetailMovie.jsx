import {React, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

import style from './DetailMovie.module.css';

import Button from '../Button';

import conclave from '../../../assets/conclave.jpg';

const DetailMovie = ()=>{
    const {cod_filme} = useParams();
    console.log('ID do filme:' +cod_filme);

    const [movie, setMovie] = useState({});

    useEffect(()=>{
        fetch(`http://localhost:5000/listagemFilme/${cod_filme}`,{
            method: 'GET',
            mode: 'cors',
            headers:{
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Headers':'*',
            },
        }). then((resp)=>resp.json())
        .then((data)=>{
            setMovie(data.data);
            console.log(data.data);
        })
        .catch((err)=>{console.log(err)});
    },[]);

    return(
        <div className={style.grid}>
            <div className={style.container_img}>
                <img className={style.img_book_detail} src={conclave} alt="Poster Filme: Conclave" />
            </div>

        <div className={style.info}>
            <span className={style.titulo}>{movie.nome_filme}</span>
            <span className={style.autor}>{movie.nome_indicado}</span>
        
        <div className={style.container_buttons}>
            <Button
                label='Editar'
                router='/updateMovie/'
                cod_filme={movie.cod_filme}
            />

                <Button
                label='Excluir'
                router='/deleteMovie/'
                cod_filme={movie.cod_filme}
            />
        </div>
       
        </div>

        </div>
    )
}
export default DetailMovie;