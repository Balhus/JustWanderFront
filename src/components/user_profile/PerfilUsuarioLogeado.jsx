import GlobalContext from "../../GlobalContext";
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Api from '../../utils/Api';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap'
import { AiOutlineEdit } from 'react-icons/ai'
import { IoClose } from "react-icons/io5";
import puntuacion_img from "../../img/puntuacion.png"
import ModalSeguidores from './ModalSeguidores'
import SitioUsuarios from "../sitio_usuarios/SitioUsuarios";
import no_img from '../../img/no-image-user.jpg';
import './PerfilUsuario.css'

function PerfilUsuario() {
    const [user, setUser] = useState([])
    const { idUser, lastPage, setLastPage, setCurrentPage } = useContext(GlobalContext);
    const [followers, setFollowers] = useState([])
    const [show, setShow] = useState(false)
    const navigateTo = useNavigate();

    const goTo = (x) => {

        if (lastPage === "/userProfile") {
            setLastPage("/")
            navigateTo("/")
        } else {
            setLastPage("/userProfile")
            navigateTo(x)
        }
    };

    useEffect(() => {
        try {
            setCurrentPage("/userProfile")
            if (idUser) {
                Api.getUser(idUser)
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
                //Gets all followers
                Api.getFollowers(idUser)
                    .then(res => {
                        if (res.ok) {
                            setFollowers(res.data)
                            console.log(res.data)
                        } else {
                            console.log("Error getFollowers: ", res.data)
                            setError(res.data)
                        }
                    })
                    .catch(err => console.log("Error getFollowers on catch Promise: ", err))
            }


        } catch (error) {
            console.log(error)
        }
    }, [idUser])

    return (
        <>
            {
                !user ?
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner> :
                    <>
                        <Container>
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

                                <Row>
                                    <Col xs="12" className="col-follow">
                                        <Button className="btn-edit" onClick={() => { setLastPage("/userProfile"); navigateTo("/userProfile/edit", { state: user }) }} >Editar perfil</Button>
                                    </Col>
                                </Row>

                                {/* <AiOutlineEdit className="user-profile-edit-btn cursor-pointer2" onClick={() => { setLastPage("/userProfile"); navigateTo("/userProfile/edit", { state: user }) }} /> */}

                                <Row className="row-followers-rating">
                                    <Col xs="6" className="col-just-left">
                                        <div className="div-seguidores" onClick={() => { setShow(true) }}>
                                            {followers ? followers.length : ""}
                                            <h6>Seguidores </h6>
                                        </div>
                                    </Col>
                                    <Col xs="6" className="col-just-right">
                                        <div className="div-seguidores">
                                            {user ? user.puntuacion : ""}
                                            <h6>Puntuación</h6>
                                        </div>
                                    </Col>
                                </Row>

                                {/* <div className="container-cabecera">

                                    <div className="div-seguidores cursor-pointer2" onClick={() => { setShow(true) }}>
                                        <h5>{followers ? followers.length : ""}</h5>
                                        <h5>Seguidores </h5>
                                    </div>
                                </div> */}
                            </Row>

                            <ModalSeguidores show={show} onHide={() => setShow(false)} followers={followers} />

                            {/* <Row>
                                <h5>Puntuación</h5>
                                <div className="puntucion-div">

                                    <div className="centered">
                                        {user ? user.puntuacion : ""}
                                    </div>

                                </div>
                            </Row> */}

                            <Row className="row-descubrimientos">
                                <h6>Descubrimientos</h6>
                            </Row>

                            <Row className="sitio-usuarios-perfil">
                                <div className="row-sitio-usuarios-perfil">
                                    <SitioUsuarios idUser={idUser} />
                                </div>
                            </Row>
                        </Container>
                    </>
            }
        </>
    );
}

export default PerfilUsuario;