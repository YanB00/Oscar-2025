import style from './Input.module.css'; 

function Input({
  movieIndicated,    
  idMovie,          
  personIndicated,  
  idPerson,          
  name,              
  handlerChange,    
  value,             
  placeholder        
}) {
  return (
    <div>
      {movieIndicated && (
        <div className={style.form_control}>
          <label htmlFor={idMovie}>{movieIndicated}</label>
          <input
            type="text"
            id={idMovie}
            name={name}
            placeholder={placeholder || `Digite ${movieIndicated.toLowerCase()}`} 
            onChange={handlerChange}
            value={value || ''} 
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
            placeholder={placeholder || `Digite ${personIndicated.toLowerCase()}`} 
            onChange={handlerChange}
            value={value || ''} 
          />
        </div>
      )}
    </div>
  );
}

export default Input;