import { useParams, useNavigate } from "react-router-dom";
import Api from '../../utils/Api';

import { FaUserPlus } from 'react-icons/fa'
import { TiTick } from 'react-icons/ti'
import { IoClose } from "react-icons/io5";

import { useEffect, useState, useContext } from "react";
import { Button, Container, Row, Spinner, Col } from "react-bootstrap";
import GlobalContext from "../../GlobalContext";
import no_img from '../../img/no-image-user.jpg';
import SitioUsuarios from "../sitio_usuarios/SitioUsuarios";
import './PerfilUsuarios.css'
import './PerfilUsuario.css'

function PerfilUsuario() {
    const { id } = useParams();
    const { token, idUser, setLastPage, setCurrentPage, lastPage, currentPage } = useContext(GlobalContext)

    const [user, setUser] = useState([])
    const [followersCount, setFollowersCount] = useState(0);
    const [seguido, setSeguido] = useState(false);
    const [alreadyFollowing, setAlreadyFollowing] = useState(false)
    const [error, setError] = useState("")

    const navigateTo = useNavigate();

    const goTo = (x) => {
        let lp = "/user/" + id;

        if (lastPage === lp) {
            setLastPage("/")
            navigateTo("/")
        } else {
            setLastPage("/user/" + id)
            navigateTo(x)
        }
    };

    useEffect(() => {
        setLastPage(currentPage)
        setCurrentPage("/user/" + id)
        try {
            if (id) {
                Api.getUser(id)
                    .then(res => {
                        if (res.ok) {
                            setUser(res.data)
                            console.log(res.data)
                        } else {
                            console.log("Error getUser: ", res.data)
                            setError(res.data)
                        }
                    })
                    .catch(err => console.log("Error getUser on catch Promise: ", err))
            }
        } catch (error) {
            console.log(error)
        }
    }, [id])

    useEffect(() => {
        if (id) {
            Api.getFollowers(id)
                .then(res => {
                    if (res.ok) {
                        setFollowersCount(res.data.length)
                        res.data.forEach((el) => {
                            if (idUser === el.id) {
                                setSeguido(true);
                                setAlreadyFollowing(true);
                            }
                        })
                        console.log(res.data)
                    } else {
                        console.log("Error getFollowers: ", res.data)
                        setError(res.data)
                    }
                })
                .catch(err => console.log("Error getFollowers on catch Promise: ", err))
        }
    }, [seguido])


    const handleFollow = () => {
        if (token) {
            const entry = {
                id_usuario_seguido: id,
                id_seguidor: idUser
            }

            fetch("http://localhost:3030/api/seguidores/new", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(entry)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.ok) {
                        setSeguido(true)
                    } else {
                        console.log(res.data)
                    }
                })
        } else {
            console.log("No estas logeado")
            setError("Inicia sesión para seguir a este usuario");
        }
    }

    const handleUnfollow = () => {
        if (token) {
            const entry = {
                id_usuario_seguido: id,
                id_seguidor: idUser
            }

            fetch("http://localhost:3030/api/seguidores/delete", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(entry)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.ok) {
                        setSeguido(false)
                    } else {
                        console.log(res.data)
                    }
                })
        } else {
            console.log("No estas logeado")
        }
    }

    return (
        <>
            {
                !user ?
                    <Container className="d-none d-sm-block margin-top-70px">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Container>
                    :
                    <>
                        <Container className="d-block d-sm-none margin-only-bottom-70px">
                            <Row className="row-profile">

                                <Row className='back-register-black'>
                                    <Col xs="6" className="cerrar-perfil">
                                        <IoClose className="close-button-registro" onClick={() => goTo(lastPage)} />
                                    </Col>
                                </Row>


                                <Row className="container-cabecera">

                                    <Col xs="12">
                                        <img src={user.foto_usuario ? "http://localhost:3030/img/" + user.foto_usuario : no_img} height="128px" width="128px" className="img-perfil" />
                                    </Col>
                                    <Row className="row-names">
                                        <Col xs="12">
                                            <div className="div-nombres">
                                                <h1>{user ? user.nombre + " " + user.apellidos : ""}</h1>
                                                <h3>{user ? user.nombre_usuario : ""}</h3>
                                            </div>
                                        </Col>
                                    </Row>
                                </Row>
                                <Row className="row-followers-rating">
                                    <Col xs="6" className="col-just-left">
                                        <div className="div-seguidores">
                                            {followersCount > -1 ? followersCount : ""}
                                            <h6>Seguidores</h6>
                                        </div>
                                    </Col>

                                    <Col xs="6" className="col-just-right">
                                        <div className="div-seguidores">
                                            {user ? user.puntuacion : ""}
                                            <h6>Puntuación</h6>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs="12" className="col-follow">
                                        {idUser !== user.id ? <Button className="btn-follow">{seguido && alreadyFollowing ? <div className="unfollow" onClick={handleUnfollow}>Dejar de seguir</div> : <div className="follow" disabled onClick={handleFollow}>Seguir</div>}</Button> : ""}
                                        <div className="msg-error-no-logeado" onClick={() => navigateTo("/login")}>
                                            {error}
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="row-descubrimientos">
                                    <h6>Descubrimientos</h6>
                                </Row>

                                <Row className="sitio-usuarios-perfil">
                                    <div className="row-sitio-usuarios-perfil">

                                        <SitioUsuarios idUser={id} />

                                    </div>
                                </Row>


                            </Row>



                        </Container>
                    </>
            }
        </>
    )
}

export default PerfilUsuario;