import React from 'react'

import style from './ContainerMovie.module.css'

const ContainerMovie = (props) => {
    return (
        <div className={style.container_movie}>
            {props.children}
        </div>
    )
}

export default ContainerMovie