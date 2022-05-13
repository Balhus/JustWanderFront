import GlobalContext from "../GlobalContext";
import { useState, useContext, useEffect } from 'react';
import Api from '../utils/Api';

import { Col, Card, Row, Container, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import SearchBar from "./search_bar/SearchBar";
import Filtro from "./search_bar/Filtro"
import no_img from "../img/no-image-user.jpg"

function ComerciosMain({ obligarRender }) {
    const { setCurrentPage, currentPage, lastPage, setLastPage, comercios, setComercios, yScrollPosition, setYScrollPosition } = useContext(GlobalContext);

    console.log(currentPage)

    //STATES
    const [fotos, setFotos] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [isLoading, setIsLoading] = useState(true)

    /**
     * Gets Comerces and Photos from the database
     */
    window.scrollTo(0, parseInt(yScrollPosition))
    useEffect(() => {
        try {
            console.log(yScrollPosition)

            setCurrentPage('/');
            Api.getAllComerces()
                .then(res => {
                    if (res.ok) {
                        setComercios(res.data)
                        setFilteredData(res.data)
                    } else {
                        console.log("Error getAllComercios: ", res.data)
                        setError(res.data)
                    }
                })
                .catch(err => console.log("Error getAllComercios on catch Promise: ", err))

            Api.getAllFotos()
                .then((res) => {
                    if (res.ok) {
                        setFotos(res.data)
                        console.log(res.data)
                    } else {
                        console.log("Error getAllComercios: ", res.data)
                        setError(res.data)
                    }
                })
        } catch (error) {
            console.log(error)
        }

    }, [])


    /**
     * Transforms the comerce data into cards to be shown
     * @param {comerce to itereare} commerce 
     * @param {index} i 
     * @returns the comerces in Card format
     */
    function showCommerces(commerce, i) {
        let url = "http://localhost:3030/img/";
        let fotoName = "";
        for (let i = 0; i < fotos.length; i++) {
            if (commerce.id === fotos[i].idComercio) {
                fotoName = fotos[i].nombre_img;
                break;
            }
        }

        let totalUrl = url + fotoName;

        return (
            <Col xs="6" md="4" lg="3" key={i} className="card-css">
                <Card className="bg-dark text-white" onClick={() => { setYScrollPosition(window.pageYOffset), setLastPage("/") }}>
                    <Link to={"/detalle_comercio/" + commerce.id} className='nav-link'>
                        <Card.Img src={fotoName ? totalUrl : no_img} alt="commerce" />
                        <Card.ImgOverlay >
                            <Card.Title>{commerce.nombre}</Card.Title>
                            {/* <Card.Text>
                                {commerce.descripcion}
                            </Card.Text> */}
                            <Card.Text>
                                {commerce.direccion}
                            </Card.Text>
                        </Card.ImgOverlay>
                    </Link>
                </Card>

            </Col>
        )
    }

    let places = []
    if (filteredData.length != 0) {
        places = filteredData.map(showCommerces);

    } else {
        places = !isLoading ? <div className="sin-resultados">Sin resultados :(</div>
            :
            <div className="div-spinner-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
    }

    //SearchBar functions
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = comercios.filter((value) => {
            return value.nombre.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([...comercios]);
        } else {
            if (newFilter.length === 0) {
                setIsLoading(false);
                setFilteredData(newFilter);
            } else {

                setFilteredData(newFilter);
            }
        }
    };

    const clearInput = () => {
        setFilteredData([...comercios]);
        setWordEntered("");
        setIsLoading(true);
    };


    //Filter functions
    const filterBy = (filters) => {
        const body = {
            id: filters
        }

        if (filters.length > 0) {
            Api.commerceFilterBy(body)
                .then(res => {
                    if (res.ok) {
                        if (res.data.length === 0) {
                            setIsLoading(false);
                        }
                        setFilteredData(res.data)
                        console.log(res.data)
                    } else {
                        console.log("Error commerceFilterBy: ", res.data)
                        setError(res.data)
                    }
                })
                .catch(err => console.log("Error commerceFilterBy on catch Promise: ", err))
        } else {
            setFilteredData([...comercios]);
            setIsLoading(true);
        }
    }


    return (
        <>
            {places ?
                <>
                    <Container className="d-none d-sm-block margin-top-70px">
                        <Row>
                            <div className="barra-busqueda-container">
                                <Filtro filterBy={filterBy} />
                                <SearchBar filteredData={filteredData} wordEntered={wordEntered} handleFilter={handleFilter} clear={clearInput} />
                            </div>
                        </Row>

                        <Row>
                            {places}
                        </Row>
                    </Container>
                    <Container className="d-block d-sm-none margin-bottom-70px">
                        <div className="barra-busqueda-container">
                            <Filtro filterBy={filterBy} />
                            <div className="search ">
                                <div className="searchbar-style searchInputs">
                                    {/* <Row> */}
                                    <SearchBar filteredData={filteredData} wordEntered={wordEntered} handleFilter={handleFilter} clear={clearInput} />
                                    {/* </Row> */}
                                </div>
                            </div>
                        </div>
                        <Row>
                            {places}
                        </Row>
                    </Container>
                </>
                :

                <div className="div-spinner-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>

            }
        </>
    )
}

export default ComerciosMain;