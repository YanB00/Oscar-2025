import {React, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function DeleteMovie() {

    const {cod_filme} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        fetch(`http://localhost:5000/excluirfilme/${cod_filme}`, {
            method:'DELETE',
            mode:'cors',
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            },
        }).then(
            resp => resp.json()
        ).then(
            (data)=>{
                navigate('/listMovie',{state:'FILME EXCLUÍDO COM SUCESSO!'});
            }
        ).catch(
            err => console.log(err)
        );
    })

    return (
        <div>
        </div>
    )
}

    export default DeleteMovie;