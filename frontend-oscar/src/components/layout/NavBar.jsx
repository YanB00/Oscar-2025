import { Link } from 'react-router-dom';
import style from './NavBar.module.css';
import Button from '../form/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Sidebar from './Sidebar'; 
import logoOscarImage from '../../../public/logooscar.png';

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar); 
  };

  return (
    <nav className={style.navbar}>
      <div className={style.logoContainer}>
        <FontAwesomeIcon 
          icon={showSidebar ? faTimes : faBars}
          className={style.menu} 
          onClick={toggleSidebar} 
        />
        <Link to="/" className={style.brand}>
          <img className={style.logo} src={logoOscarImage} alt='Logo do Oscar' />
          <span className={style.title}>Oscar</span>
        </Link>
      </div>

      <div className={style.container}>{}
        <Sidebar showSidebar={showSidebar} /> 
        <div className={style.menuContainer}>
        <Link to="/" className={style.sobre}>Home</Link> 
        <Link to="/Sobre" className={style.sobre}>Sobre</Link> 

            <Button  label='Cadastrar'/>
            <Button label='Entrar'/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;