import { useEffect, useContext, useState } from "react";
import GlobalContext from "../../GlobalContext";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import no_img from '../../img/no-image-user.jpg';



import Api from '../../utils/Api';
import './usuarios.css';
import { ContentCopy } from "@mui/icons-material";



const SitioUsuarios = (props) => {

    const { idUser, currentPage, setLastPage } = useContext(GlobalContext)
    const [comercios, setComercios] = useState([])
    const [fotos, setFotos] = useState([])

    const navigateTo = useNavigate();

    const goTo = (x) => {
        navigateTo(x)
        setLastPage(currentPage)
    };
    useEffect(() => {
        if (props.idUser) {
            fetch("http://localhost:3030/api/comercio/user/" + props.idUser)
                .then(res => res.json())
                .then(store => {

                    if (store.ok === true) {
                        console.log("Comercio en lista");
                        console.log(store)
                        setComercios(store.data)
                    } else {
                        console.log(res);
                    }
                })
                .catch((err) => console.log("Error: " + err.message));
        }

    }, [])

    useEffect(() => {
        if (comercios) {
            const com = comercios.map(el => { return el.id })
            console.log(com)

            const body = {
                id: com
            }
            const opciones = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            };

            fetch("http://localhost:3030/api/fotos/getFotosId", opciones)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    if (res.ok) {
                        setFotos(res.data)
                    } else {
                        console.log("Error getFotosComercio: ", res.data)
                        //setError(res.data)
                    }
                })
                .catch(err => console.log("Error getFotosComercio on catch Promise: ", err))
        }

    }, [comercios])



    let nombres = []

    if (comercios) {
        console.log(fotos);
        if (comercios.length > 0) {
            nombres = comercios.map((el) => {
                let url = "http://localhost:3030/img/";
                let fotoName = "";
                for (let i = 0; i < fotos.length; i++) {
                    if (el.id === fotos[i].idComercio) {
                        fotoName = fotos[i].nombre_img;
                        break;
                    }
                }
                let totalUrl = url + fotoName;

                return (

                    <Col xs="1" key={el.id} className="nombres fotos-miniatura-comercio" onClick={() => { goTo("/detalle_comercio/" + el.id) }}>
                        <div>
                        {fotos ?
                            <img src={fotoName ? totalUrl : no_img} className="img-comercio-miniatura"></img>
                            : ""
                        }
                        </div>
                        <div className="nombre-miniatura-comercio">
                        <h6>
                            {el.nombre}
                        </h6>
                        </div>
                    </Col>
                )
            })
        }
    }
    /* ctn = container
     rw = Row*/

    return (  
            <>
                {nombres}
            </>
    );
}

export default SitioUsuarios;

