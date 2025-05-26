import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import style from './UpdateMovie.module.css';
import Input from '../form/Input';
import Select from '../form/Select';
import Button from '../form/Button';

const UpdateMovies = () => {
    const [movie, setMovie] = useState({});
    const { cod_filme } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        console.log('ID do filme recebido (useParams):', cod_filme);
    }, [cod_filme]);

    function handlerChangeMovie(event) {
        setMovie({ ...movie, [event.target.name]: event.target.value });
    }

    function handleChangeCategory(event) {
        setMovie({ ...movie, cod_categoria: event.target.value });
    }

    useEffect(() => {
        fetch('http://localhost:5000/listagemCategoria', { 
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
        })
        .then((resp) => {
            if (!resp.ok) throw new Error(`Erro HTTP ao buscar categorias: ${resp.status}`);
            return resp.json();
        })
        .then((data) => {
            if (data && data.data) {
                setCategories(data.data);
                console.log('Categorias recebidas:', data.data);
            } else {
                console.error("Formato inesperado de dados de categorias:", data);
                setCategories([]);
            }
        })
        .catch((error) => console.error("Erro ao buscar categorias:", error));
    }, []);

    useEffect(() => {
        if (cod_filme) {
            fetch(`http://localhost:5000/listagemFilme/${cod_filme}`, {
                method: 'GET',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
            })
            .then((resp) => {
                if (!resp.ok) {
                    return resp.text().then(text => {
                        console.error("Resposta não OK do servidor (buscar filme):", text);
                        throw new Error(`Erro HTTP ${resp.status} ao buscar filme. Filme ID ${cod_filme} não encontrado ou endpoint incorreto.`);
                    });
                }
                return resp.json();
            })
            .then((apiData) => {
                if (apiData && apiData.data) {
                    setMovie(apiData.data);
                    console.log("Dados do filme carregados:", apiData.data); 
                } else {
                    console.error("Formato inesperado de dados do filme:", apiData);
                    setMovie({});
                }
            })
            .catch((err) => {
                console.error("Erro ao buscar filme (catch):", err);
                setMovie({});
            });
        }
    }, [cod_filme]);

    function sendMovieUpdate(movieToUpdate) {
        const { cod_filme: idFilme, ...movieDataForBody } = movieToUpdate;
        fetch(`http://localhost:5000/alterarFilme/${cod_filme}`, {
            method: 'PUT',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome_filme: movieDataForBody.nome_filme,
                nome_indicado: movieDataForBody.nome_indicado,
                cod_categoria: movieDataForBody.cod_categoria
            })
        })
        .then((resp) => {
            if (!resp.ok) {
                return resp.json().then(errorData => {
                    throw new Error(`Erro HTTP ${resp.status} ao alterar filme: ${errorData.mensageStatus || JSON.stringify(errorData)}`);
                });
            }
            return resp.json();
        })
        .then((data) => {
            if (data.errorStatus === false) {
                navigate('/ListMovie', { state: { message: 'FILME ALTERADO COM SUCESSO!' } });
            } else {
                alert(`Erro ao alterar filme: ${data.mensageStatus}`);
            }
        })
        .catch((err) => alert(`Falha na comunicação ao tentar alterar o filme: ${err.message}`));
    }

    function submit(event) {
        event.preventDefault();
        sendMovieUpdate(movie);
    }

    return (
        <section className={style.update_movie_container}>
            <h1>ALTERAÇÃO DE FILME</h1>
            <form onSubmit={submit}>
                <Input
                    movieIndicated='Título do Filme:'      
                    idMovie='nome_filme_update'           
                    name='nome_filme'
                    placeholder='Digite o título do filme'  
                    handlerChange={handlerChangeMovie}
                    value={movie.nome_filme || ''}       
                />

                <Input
                    personIndicated='Indicado Por:'     
                    idPerson='nome_indicado_update'      
                    name='nome_indicado'
                    placeholder='Digite o nome de quem indicou' 
                    handlerChange={handlerChangeMovie}
                    value={movie.nome_indicado || ''}   
                />

                <Select
                    name="cod_categoria"
                    text="Selecione a categoria do filme"
                    options={categories}
                    handlerChange={handleChangeCategory}
                    value={movie.cod_categoria || ''}
                />

                <Button label='Salvar Alterações' />
            </form>
        </section>
    );
}

export default UpdateMovies;