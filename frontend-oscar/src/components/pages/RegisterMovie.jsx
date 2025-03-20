import React from 'react';
import Input from '../form/Input';
import Button from '../form/Button';
import Select from '../form/Select';
import style from './RegisterMovie.module.css';

const RegisterMovie = () => {
  return (
    <section>
      <form className={style.form}>
        <h1>Cadastrar Filmes</h1>
        <Input
          movieIndicated="Nome do filme:"
          idMovie="movieName"
          personIndicated="" // Não precisa passar aqui, pois é para o segundo input
          idPerson="" 
        />

        <Input
          movieIndicated="" // Não precisa passar aqui, pois é para o primeiro input
          idMovie="" 
          personIndicated="Nome do indicado a categoria:"
          idPerson="personName"
        />

        <div className={style.selectContainer}> {/* Adicionado um container para o Select */}
          <Select 
            name='slc_categoria'
            id='slc_categoria'
            text='Categoria do Indicado:'
          />
        </div>
        
        <Button label='Cadastrar Filmes'/>
      </form>
    </section>
  );
};

export default RegisterMovie;