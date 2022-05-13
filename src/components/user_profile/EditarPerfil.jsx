import { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import GlobalContext from '../../GlobalContext';
import ImageUploadUser from './ImageUploadUser'
import { IoClose } from "react-icons/io5";

import './editarPerfil.css'

function EditarPerfil() {
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [feedCheck, setFeedCheck] = useState(false)
    const [ubicacionCheck, setUbicacionCheck] = useState(false)
    const [foto, setFoto] = useState()

    const [userInfo, setUserInfo] = useState()
    const location = useLocation();
    const navigateTo = useNavigate();

    const { lastPage } = useContext(GlobalContext);

    const goTo = (x) => {
        navigateTo(x)
    };

    useEffect(() => {
        setUserInfo(location.state)
        setName(location.state.nombre)
        setSurname(location.state.apellidos)
        setEmail(location.state.email)
        setFeedCheck(location.state.feed_check)
        setUbicacionCheck(location.state.ubicacion_check)
        // setFoto(location.state.foto_usuario)
    }, [])

    console.log(foto)

    function envioForm(e) {
        e.preventDefault();

        let opciones = {};

        const data = new FormData()
        data.append('id', userInfo.id);
        data.append('nombre', name);
        data.append('apellidos', surname);
        data.append('email', email);
        data.append('nombre_usuario', userInfo.nombre_usuario)
        data.append('password', userInfo.password)
        data.append('puntuacion', userInfo.puntuacion)
        data.append('feed_check', feedCheck)
        data.append('ubicacion_check', ubicacionCheck)
        data.append('activo', userInfo.activo)

        if (foto) {
            data.append('file', foto)
        } else {
            data.append('foto', userInfo.foto_usuario)
        }
        data.append('rol', userInfo.rol)

        opciones = {
            method: 'PUT',
            body: data
        };

        // const usuario = {
        //     id: userInfo.id,
        //     nombre: name,
        //     apellidos: surname,
        //     email: email,
        //     nombre_usuario: userInfo.nombre_usuario,
        //     password: userInfo.password,
        //     puntuacion: userInfo.puntuacion,
        //     feed_check: feedCheck,
        //     ubicacion_check: ubicacionCheck,
        //     activo: userInfo.activo,
        //     rol: userInfo.rol
        // }

        // opciones = {
        //     method: 'PUT',
        //     body: JSON.stringify(usuario)
        // };

        fetch("http://localhost:3030/api/usuario/edit", opciones)
            .then(res => res.json())
            .then(res => {
                if (res.ok === true) {
                    console.log("Usuario editado");
                    goTo("/userProfile")
                } else {
                    console.log(res);
                }
            })
            .catch((err) => console.log("Error: " + err.message));
    }

    console.log(userInfo)

    return (
        <>
            <Container className="ctn-photo">

                <Row className='back-register-edit '>
                    <Col xs="12" className="close-back-white">
                        <IoClose className="close-button-editar" onClick={() => goTo(lastPage)} />
                    </Col>
                </Row>

                <h1>Editar perfil</h1>

                <Row className='rw-new-photo'>
                    <Col sm="12">
                        <ImageUploadUser useFoto={[foto, setFoto]} />
                    </Col>

                </Row>
                <Row>
                    <Form onSubmit={(e) => envioForm(e)} encType='multipart/form-data'>
                        <Col className="col-perfil" xs="12">
                            <Form.Group className="perfilname" controlId="formBasicEmail">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" value={name} placeholder="Nombre" onInput={(e) => setName(e.target.value)} />

                            </Form.Group>

                            <Form.Group className="surname" controlId="formBasicEmail">
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control type="text" value={surname} placeholder="Apellidos" onInput={(e) => setSurname(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col className="col-perfil" xs="12">
                            <Form.Group className="perfilemail" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={email} placeholder="Email" onInput={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                        </Col>

                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Acceder a tu ubicación"
                            checked={feedCheck}
                            onChange={(e) => setFeedCheck(e.target.checked)}
                        />

                        <Form.Check
                            type="switch"
                            label="Recibir newsletter y novedades"
                            id="disabled-custom-switch"
                            checked={ubicacionCheck}
                            onChange={(e) => setUbicacionCheck(e.target.checked)}
                        />
                        <Col className="col-button">
                            <Button className="btncambios" variant="primary" type="submit" onClick={(e) => { envioForm(e) }}>

                                Guardar Cambios

                            </Button>
                        </Col>

                    </Form>
                </Row>
            </Container>
        </>
    )
}

export default EditarPerfil;