import { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './map.css'
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../GlobalContext";


const API_KEY = "AIzaSyCItBg8lARXkrbBdmhzqVxJCxzI2j3GwWY";

function MiniMap(props) {
    let marcadores = []
    let center = [41.400057, 2.167979]

    const {setMap} = useContext(GlobalContext)

    const navigateTo = useNavigate();

    const goTo = (x) => {
        navigateTo(x)
        setMap(true)
    };

    if (props.comercios) {
        if (props.comercios.length > 0) {
            if (props.comercios[0].latitud && props.comercios[0].longitud) {
                console.log(props.comercios[0])
                center = [props.comercios[0].latitud, props.comercios[0].longitud]

            }
            marcadores = props.comercios.map((marca, i) => {
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

export default MiniMap;