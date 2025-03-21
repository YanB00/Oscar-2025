import React from 'react';
import Input from '../form/Input';
import Button from '../form/Button';
import Select from '../form/Select';
import { useState } from 'react';
import style from './RegisterMovie.module.css';

const RegisterMovie = () => {
  const [movie, setMovie] = useState({})

  function handlerChangeMovie(event){
    setMovie({... movie, [event.target.name] :event.target.value});
    console.log(movie)
  }

  function handlerChangeCategory(event){
    setMovie({... movie, category: event.target.options[event.target.selectedIndex].text})
  }

  function submit(event){
    event.preventDefault();
    console.log(movie);
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
          />
        </div>
        
        <Button label='Cadastrar Filmes'/>
      </form>
    </section>
  );
};

export default RegisterMovie;