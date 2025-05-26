import { Link } from "react-router-dom";
import style from './Sidebar.module.css';

const Sidebar = ({ showSidebar }) => { 
  return (
    <div className={`${style.sidebar} ${showSidebar ? style.show : style.hide}`}>
      <ul className={style.sidebarList}>
        <li><Link to="/RegisterMovie" className={style.sidebarItem}>Cadastrar Filmes</Link></li>
        <li><Link to="/ListMovie" className={style.sidebarItem}>Listar Filmes</Link></li>
        <li><Link to="/Category" className={style.sidebarItem}>Categorias</Link></li>
        <li><Link to="/Review" className={style.sidebarItem}>Review</Link></li>
        <li><Link to="/Favorite" className={style.sidebarItem}>Favoritos</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;