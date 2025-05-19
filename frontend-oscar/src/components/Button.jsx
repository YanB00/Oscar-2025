import { Link } from 'react-router-dom'
import style from './Button.module.css'

const Button = ({label, router, cod_filme})=>{
    return(
            <div className={style.buttonContainer}>
                <Link to={`${router}${cod_filme}`}>
                    <button>{label}</button>
                </Link>
            </div>
    )  
}

export default Button