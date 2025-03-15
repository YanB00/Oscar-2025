import style from './Button.module.css'

const Button = ({label})=>{
    return(
            <div>
                <button className={style.button}>{label}</button>
            </div>
    )  
}

export default Button