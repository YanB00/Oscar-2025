import React from 'react';
import Input from '../form/Input';
import Button from '../form/Button';
import Select from '../form/Select';

const RegisterMovie = () => {
  return (
    <section>
      <form>
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


        <Select
         name='slc_categoria'
         id='slc_categoria'
         text='Categoria do Indicado:'
        />
        
        <Button label='Cadastrar Filmes'/>
      </form>
    </section>
  );
};

export default RegisterMovie;