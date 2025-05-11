import Button from "./form/Button";
import style from './MovieCard.module.css'; 

const MovieCard = ({ cod_filme, nome_filme, nome_indicado, cod_categoria, imagem}) => {
  return (
    <div className={style.movieCard}> 
      <h3 className={style.titulo}>{nome_filme}</h3> 
      <p className={style.indicado}>Indicado por: {nome_indicado}</p> 
        {imagem && <img src={imagem} alt={`Capa do filme: ${nome_filme}`} />} 
      <Button label='DETALHE' />
    </div>
  );
};

export default MovieCard;