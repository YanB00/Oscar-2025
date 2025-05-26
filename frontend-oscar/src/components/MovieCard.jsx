import React from 'react';
import Button from './Button'; 
import style from './MovieCard.module.css';

const MovieCard = ({ cod_filme, nome_filme, nome_indicado, cod_categoria, imagem }) => {
  return (
    <div className={style.movieCard}>
      {imagem && <img src={imagem} alt={`Capa do filme: ${nome_filme}`} className={style.movieImage} />} {/* Adicionei uma classe para estilização opcional da imagem */}
      
      <div className={style.movieInfo}> 
        <h3>{nome_filme}</h3>
        <p>Indicado: {nome_indicado}</p>
        <Button
          label='DETALHE'
          router='/DetailMovie/' 
          cod_filme={cod_filme}   
        />
      </div>
    </div>
  );
};

export default MovieCard;
