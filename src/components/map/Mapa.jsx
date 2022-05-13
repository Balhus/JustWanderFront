import { useContext, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './map.css'
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../GlobalContext";
import SearchBar from "./../search_bar/SearchBar";
import Filtro from "./../search_bar/Filtro"
import Api from '../../utils/Api';
const API_KEY = "AIzaSyCItBg8lARXkrbBdmhzqVxJCxzI2j3GwWY";

function Mapa(props) {
    let marcadores = []
    let center = [41.400057, 2.167979]
    const [filteredData, setFilteredData] = useState([...props.comercios]);
    const [wordEntered, setWordEntered] = useState("");
    
    const {setMap} = useContext(GlobalContext)

    const navigateTo = useNavigate();

    const goTo = (x) => {
        navigateTo(x)
        setMap(true)
    };

    //SearchBar functions
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = props.comercios.filter((value) => {
            return value.nombre.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([...props.comercios]);
        } else {
            setFilteredData(newFilter);

        }
    };

    const clearInput = () => {
        setFilteredData([...props.comercios]);
        setWordEntered("");
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
                        setFilteredData(res.data)
                        console.log(res.data)
                    } else {
                        console.log("Error commerceFilterBy: ", res.data)
                        setError(res.data)
                    }
                })
                .catch(err => console.log("Error commerceFilterBy on catch Promise: ", err))
        } else {
            setFilteredData([...props.comercios]);
        }
    }

    if (filteredData) {
        if (filteredData.length > 0) {
            if (filteredData[0].latitud && filteredData[0].longitud) {
                console.log(filteredData[0])
                center = [filteredData[0].latitud, filteredData[0].longitud]

            }
            marcadores = filteredData.map((marca, i) => {
                if (marca.latitud && marca.longitud) {
                    return (
                        <Marker key={i} position={[marca.latitud, marca.longitud]} >
                            <Popup>
                                <div onClick={() => { console.log(marca); goTo("/detalle_comercio/" + marca.id) }}>
                                    {marca.nombre}
                                </div>
                            </Popup>
                        </Marker>
                    );
                }

            })
        }
    }

    return (
        <div id='map' style={props.style}>
            <div className="barra-busqueda-container">
                            <Filtro filterBy={filterBy}/>
                            <div className="search ">
                                <div className="searchbar-style searchInputs">
                                    {/* <Row> */}
                                    <SearchBar filteredData={filteredData} wordEntered={wordEntered} handleFilter={handleFilter} clear={clearInput}/>
                                    {/* </Row> */}
                                </div>
                            </div>
                        </div>
            <MapContainer center={center} zoom={props.zoomLevel}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {marcadores}
            </MapContainer>
        </div>
    );
}

export default Mapa
