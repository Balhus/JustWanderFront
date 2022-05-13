import GlobalContext from "../GlobalContext";
import { useState, useContext, useEffect } from 'react';
import Api from '../utils/Api';

import no_img from '../img/no-image-user.jpg';
import { Col, Card, Row, Container, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai'
import SearchBar from "./search_bar/SearchBar";
import { GoStar } from "react-icons/go";

function Usuarios() {
    const { setCurrentPage, currentPage, lastPage, setLastPage, comercios, setComercios, yScrollPosition } = useContext(GlobalContext);

    const [usuarios, setUsuarios] = useState([])
    const [wordEntered, setWordEntered] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        setCurrentPage('/usuarios');
        window.scrollTo(0, yScrollPosition)
        Api.getAllUsers()
            .then(res => {
                if (res.ok) {
                    setUsuarios(res.data.filter(user => user.email !== "admin@gmail.com"))
                    setFilteredUsers(res.data.filter(user => user.email !== "admin@gmail.com"))
                    console.log(res.data)
                } else {
                    console.log("Error getAllUsers: ", res.data)
                    setError(res.data)
                }
            })
            .catch(err => console.log("Error getAllUsers on catch Promise: ", err))

    }, [])

    function showUsers(user, i) {
        let url = "http://localhost:3030/img/";


        let totalUrl = url + user.foto_usuario;

        return (
            <Col xs="6" md="4" lg="3" key={i} className="card-css">
                <Card className="bg-dark text-white" onClick={() => { setYScrollPosition(window.pageYOffset); setLastPage("/usuarios") }}>
                    <Link to={"/user/" + user.id} className='nav-link'>
                        <Card.Img src={user.foto_usuario ? totalUrl : no_img} alt="user" />
                        <Card.ImgOverlay className="cards-users">
                            <Card.Text>
                                {user.puntuacion}{' '}<GoStar />
                            </Card.Text>
                            <Card.Title>{user.nombre_usuario}</Card.Title>
                        </Card.ImgOverlay>
                    </Link>
                </Card>

            </Col>
        )
    }

    function handleFilter(e) {
        const searchWord = e.target.value;
        setWordEntered(searchWord);
        const newFilter = usuarios.filter((value) => {
            return value.nombre_usuario.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredUsers([...usuarios]);
        } else {
            if (newFilter.length === 0) {
                setIsLoading(false);
                setFilteredUsers(newFilter);
            } else {
                setFilteredUsers(newFilter);

            }
        }
    }

    function clearInput() {
        setFilteredUsers([...usuarios]);
        setWordEntered("");
        setIsLoading(true);

    }

    let rows = []
    if (filteredUsers.length != 0) {
        rows = filteredUsers.map(showUsers);
    } else {
        rows = !isLoading ? <div className="sin-resultados">Sin resultados :(</div>
            : <div className="div-spinner-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>

    }

    return (
        <>
            {
                rows.length === 0 ?
                    <div className="div-spinner-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                    :
                    <>
                        <Container className="d-none d-sm-block margin-top-70px">
                            <Row>
                                {rows}
                            </Row>
                        </Container>
                        <Container className="d-block d-sm-none margin-bottom-70px">
                            <div className="barra-busqueda-container-usuarios">
                                <div className="search-usuario ">
                                    <div className="searchbar-style-usuario searchInputs">
                                        <SearchBar filteredData={filteredUsers} handleFilter={handleFilter} wordEntered={wordEntered} clear={clearInput} />

                                    </div>
                                </div>
                                {/* <Row> */}
                                {/* <Filtro filterBy={filterBy} /> */}
                                {/* </Row> */}
                            </div>
                            <Row>
                                {rows}
                            </Row>
                        </Container>
                    </>
            }
        </>


    );

}

export default Usuarios;