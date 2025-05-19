import Button from "./form/Button";
import style from './MovieCard.module.css'; 

const MovieCard = ({ cod_filme, nome_filme, nome_indicado, cod_categoria, imagem }) => {
  return (
    <div className={style.movieCard}> 
      <h3>{nome_filme}</h3> 
      <p>Indicado: {nome_indicado}</p> 
      {imagem && <img src={imagem} alt={`Capa do filme: ${nome_filme}`} />} 
      <Button 
        label='DETALHE' 
        router='/detailMovie/'
        cod_filme={cod_filme}
      />
    </div>
  );
};

export default MovieCard;
