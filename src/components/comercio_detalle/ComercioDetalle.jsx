import commerces from '../../json/commerces.json'

import { useState, useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { Col, Row, Container, Carousel, Button, Modal, Badge, Spinner } from 'react-bootstrap';

import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IoClose, IoArrowBack } from "react-icons/io5";
import { HiLocationMarker } from 'react-icons/hi'
import { AiFillStar } from 'react-icons/ai'
import no_img from '../../img/no-image-user.jpg';

import RatingSize from './RatingSize';
import GlobalContext from "../../GlobalContext";

import { motion } from 'framer-motion'

import MiniMap from "../map/MiniMap";
import Api from '../../utils/Api';
import './ComercioDetalle.css'

const animations = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -100 }
}

function ComercioDetalle() {

    const params = useParams();
    const { comercios, lastPage } = useContext(GlobalContext)
    const id = parseInt(params.id)

    const commerce = comercios.find(e => e.id === id)

    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [fotos, setFotos] = useState([]);
    const [filters, setFilters] = useState([]);
    const [usuario, setUsuario] = useState([]);
    //DESCRIPTION
    const [descStyle, setDescStyle] = useState('desc-row');
    const [moreLessText, setMoreLessText] = useState('...seguir leyendo ');
    const [moreLessIcon, setMoreLessIcon] = useState(<IoIosArrowDown />);

    const navigateTo = useNavigate();

    const goTo = (x) => {
        navigateTo(x)
    };

    useEffect(() => {
        window.scrollTo(0, 0)
        if (commerce) {

            Api.getFotosComercio(commerce.id)
                .then(res => {
                    if (res.ok) {
                        setFotos(res.data)
                        console.log(res.data)
                    } else {
                        console.log("Error getFotosComercio: ", res.data)
                        //setError(res.data)
                    }
                })
                .catch(err => console.log("Error getFotosComercio on catch Promise: ", err))

            Api.getFiltersOfCommerce(commerce.id)
                .then(res => {
                    if (res.ok) {
                        setFilters(res.data)
                        console.log(res.data)
                    } else {
                        console.log("Error getFiltersOfCommerce: ", res.data)
                        //setError(res.data)
                    }
                })
                .catch(err => console.log("Error getFiltersOfCommerce on catch Promise: ", err))

            Api.getUser(commerce.usuario_creador)
                .then(res => {
                    if (res.ok) {
                        setUsuario(res.data)
                        console.log(res.data)
                    } else {
                        console.log("Error getUser: ", res.data)
                        //setError(res.data)
                    }
                })
                .catch(err => console.log("Error getUser on catch Promise: ", err))

        }

    }, [commerce])

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }


    function readMoreLess() {
        if (descStyle === 'desc-row-hidden') {
            setDescStyle('desc-row');
            setMoreLessText('...seguir leyendo ');
            setMoreLessIcon(<IoIosArrowDown />);
        } else {
            setDescStyle('desc-row-hidden');
            setMoreLessText('Mostrar menos ');
            setMoreLessIcon(<IoIosArrowUp />);
        }
    }

    console.log(lastPage)
    return (

        <motion.div variants={animations} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.8 }}>
            <>
                {commerce ?
                    <>
                        <Container className="d-none d-sm-block container-detail-pc">

                            <Row className='search'>
                                <Col xs="12">
                                    <Link to="/" className='nav-link search'><h6><IoArrowBack /> Resultados de la búsqueda</h6></Link>
                                </Col>
                            </Row>

                            <Row className='title'>
                                <Col xs="12">
                                    <div className="detalle-comercio-titulo">

                                        <h1> {commerce.nombre}</h1>
                                    </div>
                                    <div className='estrellitas'>
                                        <RatingSize valoracion={commerce.valoracion} comerceId={id} />
                                    </div>
                                </Col>
                                {/* <Col xs="6">
                        
                    </Col> */}
                            </Row>

                            <Row className='desc'>
                                <Col xs="12">
                                    {filters && (
                                        filters.map((el) => {
                                            return (
                                                <>
                                                    <Badge pill bg="success">
                                                        {el.nombre}
                                                    </Badge>{' '}
                                                </>
                                            );
                                        })
                                    )}
                                </Col>

                                <Col xs="12" className={descStyle}>
                                    {commerce.descripcion}
                                </Col>
                            </Row>

                            <Row className='read-moreless'>
                                <Col xs="12">
                                    <strong className="hand" onClick={readMoreLess}>{moreLessText}{moreLessIcon}</strong>
                                </Col>
                            </Row>

                            <Row className="row-detail">

                                <Col className="col-detail" xs="6">
                                    <MiniMap style={{ height: '100%', width: '100%' }} comercios={[commerce]} zoomLevel={10} />
                                </Col>

                                <Col className="col-detail" xs="6">
                                    <Button className='btn btn-success' onClick={() => handleShow('sm-down')}>
                                        <OpenInFullIcon />
                                    </Button>
                                    <Carousel interval={null} className='crop'>
                                        {fotos && (
                                            fotos.map((el) => {
                                                let url = "http://localhost:3030/img/";
                                                const totalUrl = url + el.nombre_img;
                                                return (
                                                    <Carousel.Item >
                                                        <img
                                                            className="d-block w-100"
                                                            src={totalUrl}
                                                            alt="Foto 1"
                                                        />
                                                    </Carousel.Item>
                                                )
                                            })
                                        )}
                                    </Carousel>


                                    <Modal className="d-none d-sm-block" show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                                        <Modal.Body>
                                            <Button className='btn btn-success close' onClick={() => setShow(false)}>
                                                <IoClose />
                                            </Button>
                                            <Carousel interval={null}>
                                                {fotos && (
                                                    fotos.map((el) => {
                                                        let url = "http://localhost:3030/img/";
                                                        const totalUrl = url + el.nombre_img;
                                                        return (
                                                            <Carousel.Item >
                                                                <img
                                                                    className="d-block w-100"
                                                                    src={totalUrl}
                                                                    alt="Foto 1"
                                                                />

                                                            </Carousel.Item>
                                                        )
                                                    })
                                                )}
                                            </Carousel>
                                        </Modal.Body>
                                    </Modal>
                                </Col>

                            </Row>

                        </Container>


                        <Container className="d-block d-sm-none container-detail-movil">
                            <Row className="">
                                <Col className="col-detail" xs="12">
                                    <Button className='btn btn-success cerrar-detalle-mobile' onClick={() => goTo(lastPage)}>
                                        <IoClose className='close-button-detalle' />
                                    </Button>
                                    <Carousel interval={null} className='crop'>
                                        {fotos && (
                                            fotos.map((el) => {
                                                let url = "http://localhost:3030/img/";
                                                const totalUrl = url + el.nombre_img;
                                                return (
                                                    <Carousel.Item onClick={() => handleShow('md-down')}>
                                                        <img
                                                            className="d-block w-100"
                                                            src={totalUrl}
                                                            alt="Foto 1"
                                                        />

                                                    </Carousel.Item>
                                                )
                                            })
                                        )}
                                    </Carousel>

                                    <Modal className='d-block d-sm-none' show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                                        <Button className='btn btn-success close' onClick={() => setShow(false)}>
                                            <IoClose />
                                        </Button>
                                        <Carousel interval={null}>
                                            {fotos && (
                                                fotos.map((el) => {
                                                    let url = "http://localhost:3030/img/";
                                                    const totalUrl = url + el.nombre_img;
                                                    return (
                                                        <Carousel.Item onClick={() => handleShow('md-down')}>
                                                            <img
                                                                className="d-block w-100"
                                                                src={totalUrl}
                                                                alt="Foto 1"
                                                            />

                                                        </Carousel.Item>
                                                    )
                                                })
                                            )}
                                        </Carousel>
                                    </Modal>
                                </Col>
                            </Row>

                            <Row className='title'>
                                <Col xs="12">
                                    <div className="detalle-comercio-titulo">
                                        <h1> {commerce.nombre}</h1>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <div className="detalle-comercio-direccion">
                                        <HiLocationMarker className="direccion-marker-detalle" />{' '}{commerce.direccion}
                                    </div>
                                </Col>
                            </Row>

                            <Row className='title'>
                                <Col xs="12" className="filters">
                                    {filters && (
                                        filters.map((el) => {
                                            return (
                                                <>
                                                    <Badge pill bg="success">
                                                        {el.nombre}
                                                    </Badge>{' '}
                                                </>
                                            );
                                        })
                                    )}
                                </Col>
                            </Row>

                            <Row className='desc me-0'>
                                <Col xs="12" className={descStyle}>
                                    {commerce.descripcion}
                                </Col>
                            </Row>

                            <Row className='read-moreless'>
                                <Col className="read-moreless-movil p-0" xs="12">
                                    <strong className="hand" onClick={readMoreLess}>{moreLessText}{moreLessIcon}</strong>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <div className='estrellitas-mobile'>
                                        <RatingSize valoracion={commerce.valoracion} comerceId={id} />
                                    </div>
                                </Col>
                            </Row>

                            <p className="ubicacion-detalle">Encuéntralo</p>
                            <Row className="map-container">
                                <Col xs="12" className="map-detalle">
                                    <MiniMap style={{ height: '100%', width: '100%' }} comercios={[commerce]} zoomLevel={10} />
                                </Col>
                            </Row>

                            <Row className='detalle-usuario-creador title'>
                                <Col xs="12" className='creador'>
                                    <p className="usuario-detalle-title m-0">Descubierto por</p>
                                    <div>
                                    </div>
                                    <div className="usuario-detalle-info-container" onClick={() => goTo("/user/" + usuario.id)}>
                                        <img src={usuario.foto_usuario ? "http://localhost:3030/img/" + usuario.foto_usuario : no_img} className="img-usuario-detalle"></img>
                                    </div>
                                    <div>
                                        <div className="usuario-detalle-info-nombre">{usuario.nombre_usuario}</div>

                                        <div className="puntuacion-usuario-detalle">{usuario.puntuacion} <AiFillStar className='user-detalle-estrella' /></div>
                                    </div>
                                </Col>
                            </Row>

                        </Container>
                    </>
                    : <Container className="d-none d-sm-block margin-top-70px">
                        <Spinner className="div-spinner-center" animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Container>}
            </>
        </motion.div>

    )
}

export default ComercioDetalle;