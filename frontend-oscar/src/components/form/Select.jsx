import style from './Select.module.css'

function Select({ text, name, id }) {
  const categories = [
  "Melhor Filme",
  "Melhor Diretor",
  "Melhor Ator",
  "Melhor Atriz",
  "Melhor Ator Coadjuvante",
  "Melhor Atriz Coadjuvante",
  "Melhor Roteiro Original",
  "Melhor Roteiro Adaptado",
  "Melhor Filme de Animação",
  "Melhor Filme Internacional",
  "Melhor Documentário",
  "Melhor Curta-Metragem",
  "Melhor Curta de Animação",
  "Melhor Curta Documentário",
  "Melhor Trilha Sonora Original",
  "Melhor Canção Original",
  "Melhor Design de Produção",
  "Melhor Figurino",
  "Melhor Maquiagem e Cabelo",
  "Melhor Som",
  "Melhores Efeitos Visuais",
  "Melhor Edição"
  ];

  return (
    <div className={style.form_control}>
      <label htmlFor={name}>{text}</label>
      <select name={name} id={id}>
        <option value="">Selecione uma categoria</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
}

export default Select;