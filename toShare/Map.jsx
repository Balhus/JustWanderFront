import { useEffect } from "react";
import { useRef } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";


const Map = props => {
    const mapRef = useRef();
    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: 41.3874, lng: 2.1686 },
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            controlSize: 24,
            zoom: 11
        });
        
        const markers = props.sites.map(location => {
            const marker = new window.google.maps.Marker({ position: { lat: location.latitude, lng: location.longitude }, map });
            return marker;
        });
        new MarkerClusterer({ map, markers });
    }, [props.sites]);

    return <div ref={mapRef} className='map'></div>
}

export default Map