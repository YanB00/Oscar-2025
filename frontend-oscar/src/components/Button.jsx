import { Link } from 'react-router-dom';
import compStyle from './Button.module.css'; 

const Button = ({ label, router, cod_filme, className }) => {
    return (
        <div className={compStyle.buttonContainer}> 
            <Link 
                to={`${router}${cod_filme}`}
                style={{ textDecoration: 'none', display: 'block' }} 
            >
                <button className={`${compStyle.button} ${className || ''}`}>
                    {label}
                </button>
            </Link>
        </div>
    );
};

export default Button;