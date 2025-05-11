import React from 'react';
import Input from '../form/Input';
import Button from '../form/Button';
import Select from '../form/Select';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import style from './RegisterMovie.module.css';

const RegisterMovie = () => {
  const [movie, setMovie] = useState({})

  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  function handlerChangeMovie(event){
    setMovie({... movie, [event.target.name] :event.target.value});
    console.log(movie)
  }

  function handlerChangeCategory(event){
    setMovie({... movie, cod_categoria: event.target.value})
  }

  function submit(event){
    event.preventDefault();
    console.log(movie);
    insertMovie(movie);
  }

  useEffect(()=>{
    fetch('http://localhost:5000/listagemCategoria',{
      method:'GET',
      headers:{
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Headers':'*'
    },
  }).then((resp)=>
    resp.json()
  ).then((categorias)=>{
    console.log('TESTE '+ categorias.data);
    setCategories(categorias.data)
  }).catch((error)=>{
    console.log('Erro: ' + error);
  })
}, []);

function insertMovie(movie){
  fetch('http://localhost:5000/RegisterMovie',{
    method:'POST',
    mode: 'cors',
    headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'*'
  },
  body:JSON.stringify(movie)
}).then((resp)=>
    resp.json()
).then((respJSON)=>{
  console.log('RESPOSTA: ' +respJSON);
}).catch((error)=>{
  console.log('Erro ' + error)
})

}

  return (
    <section>
      <form className={style.form} onSubmit={submit}>
        <h1>Cadastrar Filmes</h1>
        <Input
          movieIndicated="Nome do filme:"
          idMovie="movieName"
          personIndicated="" // Não precisa passar aqui, pois é para o segundo input
          idPerson="" 
          handlerChange={handlerChangeMovie}
        />

        <Input
          movieIndicated="" // Não precisa passar aqui, pois é para o primeiro input
          idMovie="" 
          personIndicated="Nome do indicado a categoria:"
          idPerson="personName"
          handlerChange={handlerChangeMovie}
        />

        <div className={style.selectContainer}> {}
          <Select 
            name='slc_categoria'
            id='slc_categoria'
            text='Categoria do Indicado:'
            handlerChange={handlerChangeCategory}
            options={categories}
          />
        </div>
        
        <Button label='Cadastrar Filmes'/>
      </form>
    </section>
  );
};

export default RegisterMovie;