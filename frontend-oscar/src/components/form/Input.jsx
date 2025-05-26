import style from '../form/Input.module.css';

function Input({ movieIndicated, idMovie, personIndicated, idPerson, name, handlerChange}) {
  return (
    <div>
      {movieIndicated && (
        <div className={style.form_control}>
          <label htmlFor={idMovie}>{movieIndicated}</label>
          <input
            type="text"
            id={idMovie}
            name={name} 
            placeholder={`Digite o ${movieIndicated}`}
            onChange={handlerChange}
          />
        </div>
      )}

      {personIndicated && (
        <div className={style.form_control}>
          <label htmlFor={idPerson}>{personIndicated}</label>
          <input
            type="text"
            id={idPerson}
            name={name} 
            placeholder={`Digite o ${personIndicated}`}
            onChange={handlerChange}
          />
        </div>
      )}
    </div>
  );
}

export default Input;