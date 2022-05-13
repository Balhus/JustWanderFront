import GlobalContext from "../../GlobalContext";
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Api from '../../utils/Api';
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import ImageUpload from './ImageUpload'
import Mapa from "../map/Mapa"
import { IoMdArrowDropdown } from 'react-icons/io'
import { IoClose, IoArrowBack } from "react-icons/io5";
import './RegistroComercio.css'
import { LabelImportant } from "@mui/icons-material";

const FilterSelector = ({ filters, index, idSelected, setItemSelected }) => {
    return (<>
        <Form.Select aria-label="Filter" onChange={(e) => setItemSelected(e.target.value, index)}>
            <option value={0}>Open this select menu</option>

            {filters.map((filtro, key) => {
                return (
                    <option key={key} value={filtro.id} selected={filtro.id === idSelected[index] ? true : false}>{filtro.nombre}</option>
                );
            })}
        </Form.Select>
    </>)
}

function RegistroComercio() {
    const { currentPage, lastPage, setLastPage, token, idUser } = useContext(GlobalContext);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [foto, setFoto] = useState([])
    const [filtro, setFiltro] = useState([])
    const [lat, setLat] = useState("")
    const [long, setLong] = useState("")
    const [filtrosSelect, setFiltrosSelect] = useState([])
    const [error, setError] = useState("")
    const [messageName, setMessageName] = useState('');
    const [nameClass, setNameClass] = useState('');
    const [readOnlySwitch, setReadOnlySwitch] = useState('');
    const [idSelected, setIdSelected] = useState([0]) //Id de todos los filtros seleccionados
    const [numFilters, setNumFilters] = useState(1); //Numero de filtros que hay
    const [autocomplete, setAutocomplete] = useState()
    const [numCategorias, setNumCategorias] = useState(0)

    const [toFilter, setToFilter] = useState([])
    const [showCategorias, setShowCategorias] = useState(false);

    let allCorrect = true;

    const navigateTo = useNavigate();

    const goTo = (x) => {
        navigateTo(x)
    };

    //Google autocomplete direction, set one time
    useEffect(() => {
        setLastPage(currentPage);
        setAutocomplete(new window.google.maps.places.Autocomplete((document.getElementById("direccionForm")), {
            types: ['geocode'],
        }))

    }, [])

    if (autocomplete) {
        autocomplete.addListener("place_changed", () => {
            setLatLong(autocomplete.getPlace());
        })
    }

    //Makes the fetch to the database to get all the filters
    useEffect(() => {
        try {
            Api.getAllFilters()
                .then(res => {
                    if (res.ok) {
                        setFiltrosSelect(res.data)
                        console.log(res.data)
                    } else {
                        console.log("Error getAllFilters: ", res.data)
                        setError(res.data)
                    }
                })
                .catch(err => console.log("Error getAllFilters on catch Promise: ", err))
        } catch (error) {
            console.log(error)
        }
    }, [])

    //Sets in the array the option selectced by the user on the position of the filter
    function setItemSelected(val, index) {
        let newIdSelected = idSelected.map((el, idx) => {
            if (index === idx) {
                return val * 1;
            }
            return el;
        })
        setIdSelected(newIdSelected)
    }

    //Name field validation
    function validateName(e) {
        let vn = e.target.value;
        setName(vn);
        if (vn.length > 0 && !vn.trim()) {
            setMessageName("Name cannot be empty!");
            setNameClass("is-invalid");
            allCorrect = false;
        } else if (vn !== null && vn.length !== 0) {
            setMessageName(" ");
            setNameClass("is-valid");
        } else {
            setMessageName(" ");
            setNameClass("md-3");
        }
    };

    function addFilter() {
        setNumFilters(numFilters + 1);
        setIdSelected([...idSelected, 0]);
    }

    //onSubmit Event function to execute. Sets the data from the form to FormData and send it to the database
    function sendForm(e) {
        // e.preventDefault();
        setReadOnlySwitch({ readOnly: true })

        if (foto.length > 0 && idSelected.length !== 0) {
            console.log("Entra send")
            setError("");
            const data = new FormData()

            for (let i = 0; i < foto.length; i++) {
                data.append("files", foto[i]);
            }
            // data.append("file", foto[0])
            data.append('name', name);
            data.append('description', description);
            data.append('address', address);
            data.append('longitude', long);
            data.append('latitude', lat);
            data.append('idUser', idUser);
            for (let i = 0; i < toFilter.length; i++) {
                data.append("filter[]", toFilter[i]);
            }

            const opciones = {
                method: 'POST',
                body: data
            };

            fetch("http://localhost:3030/api/comercio/new", opciones)
                .then(res => res.json())
                .then(res => {
                    if (res.ok === true) {
                        console.log("Comercio añadido");
                        // goTo("/revision")
                        goTo(lastPage)
                    } else {
                        console.log(res);
                    }
                })
                .catch((err) => console.log("Error: " + err.message));
        } else {
            if (foto.length < 0 && toFilter.length === 0) {
                setError("A photo and a category are needed!")
            } else if (toFilter.length === 0) {
                setError("Select a category at least!")
            } else {
                setError("Upload a photo at least!")
            }

        }
    }

    //Creates the dynamic filters
    const nouArrayFiltros = [];
    for (let i = 0; i < numFilters; i++) {
        nouArrayFiltros.push(<FilterSelector key={i} filters={filtrosSelect} index={i} idSelected={idSelected} setItemSelected={setItemSelected} />)
    }

    //TODO: averiguar el trigger al clicar una de las opciones del autocompletar para poder setear address y lat, long
    function setLatLong(value) {
        setAddress(value.formatted_address)

        console.log(value);
        // console.log(value.geometry.location)
        if (value.geometry.viewport) {
            console.log("entra")
            setLat(value.geometry.location.lat());
            setLong(value.geometry.location.lng());
        }

    }


    function selectFilter(e) {
        let val = e.target.id;
        console.log(val)

        if (val) {
            val = parseInt(val);
            if (val === 0) {
                setToFilter([])
            } else {
                if (toFilter.includes(val)) {
                    //Quitar clase activo
                    const nArr = toFilter.filter(el => el !== val)
                    setToFilter(nArr)
                    setNumCategorias(numCategorias - 1)
                } else {
                    //Clase activo
                    setToFilter([...toFilter, val])
                    setNumCategorias(numCategorias + 1)

                }
            }
        }
        makeActive(val)
    }

    function makeActive(i) {
        var current = document.getElementById(i);
        try {
            if (current) {

                if (i === 0) {
                    var bElements = document.getElementsByClassName("activo2")
                    Array.from(bElements).forEach(element => {
                        element.className = element.className.replace(" activo2 ", "");
                    });

                    console.log(bElements)
                } else {

                    if (current.className.includes("activo2")) {
                        current.className = current.className.replace(" activo2 ", "");
                    } else {
                        current.className = current.className.replace("", " activo2 ");
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {

        if (toFilter.length > 0) {
            toFilter.forEach(filter => {
                console.log(filter)
                makeActive(filter);
            })
        }

    }, [showCategorias])

    console.log("TO FILTER: ", toFilter)
    console.log(lat, long)
    return (
        <Container className="container-registro-comercio">
            {/* <Button onClick={() => goTo(lastPage)}>Go Back</Button> */}
            <Row className='back-register '>
                <Col xs="12" className="close-back-white">
                    <IoClose className="close-button-registro" onClick={() => goTo(lastPage)} />
                </Col>
            </Row>
            <Form onSubmit={(e) => { sendForm(e) }} encType='multipart/form-data'>
                {/* <div className="mb-3"> */}
                <Row className='row-new-photo-registro mb-3 mt-1'>
                    <Col sm="12">
                        <ImageUpload useFoto={[foto, setFoto]} />
                    </Col>
                </Row>
                {/* </div> */}
                <Row>

                    <Form.Group className="mb-3 form-basic-email" controlId="">
                        <Form.Control
                            {...readOnlySwitch}
                            className={nameClass}
                            required
                            value={name}
                            onInput={validateName}
                            type="text"
                            placeholder="Nombre del comercio" />
                        <Form.Text>
                            {messageName}
                        </Form.Text>
                    </Form.Group>
                </Row>

                <Row>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            {...readOnlySwitch}
                            className={nameClass}
                            id="direccionForm"
                            required
                            value={address}
                            onChange={(e) => { setAddress(e.target.value) }}
                            type="text"
                            placeholder="Dirección" />
                        <Form.Text>
                            {messageName}
                        </Form.Text>
                    </Form.Group>
                </Row>
                <Row>

                    <Form.Group className="mb-3" controlId="formBasicDesc">
                        <Form.Control
                            {...readOnlySwitch}
                            required
                            value={description}
                            onInput={(e) => { setDescription(e.target.value) }}
                            as="textarea"
                            rows={5}
                            placeholder="Descripción" />
                        <Form.Text>
                            {messageName}
                        </Form.Text>
                    </Form.Group>
                </Row>



                <Row className="categoria-container">

                    <div className="div-titulo-categoria" onClick={() => setShowCategorias(!showCategorias)}>Categorias({numCategorias})<IoMdArrowDropdown /></div>
                    {showCategorias ?
                        <>
                            <div className="select-categoria-registro">
                                {filtrosSelect.map((value, key) => {
                                    return (
                                        <div className='element-categ-reg dataItem' id={value.id} key={key} onClick={(e) => { selectFilter(e) }}>

                                            {value.nombre}
                                        </div>
                                    );
                                })}
                            </div>
                            <Button className="btn-select-categorias" onClick={() => setShowCategorias(!showCategorias)}>Añadir</Button>
                        </>
                        : ""}
                </Row>


                {/* {nouArrayFiltros} */}
                {/* 
                <div>
                    <Button onClick={addFilter} variant="secondary" type="button">New filter</Button>
                </div> */}

                <div className="button-container-reg">
                    <div className="button-enviar-reg-comercio" variant={error ? "danger" : "secondary"} onClick={e => sendForm(e)} type="submit">Enviar</div>
                </div>
                <div>
                    {error}
                </div>
            </Form>




        </Container>
    );
}

export default RegistroComercio;