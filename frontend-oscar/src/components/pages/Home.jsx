import React from 'react';
import style from './Home.module.css';

const Home = () => {
    return (
        <section className={style.home_con}>
            <div className={style.home_text_content}> 
                <h1>Bem-vindo ao OscarTeca!</h1>
                <p>Sua central definitiva para explorar, cadastrar e analisar os filmes que fizeram história na Academia.</p>
                <p>Mergulhe no glamour do cinema, adicione seus filmes favoritos que concorreram ao Oscar e compartilhe suas críticas e opiniões com outros apaixonados pela sétima arte.</p>
                <p>
                    Pronto para começar?{' '}
                </p>
            </div>
        </section>
    );
}

export default Home;