import { useState } from "react";
import { IoMapOutline, IoGridOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

function Switch(props) {

    let source = !props.mapa ? <Link to="/" className='nav-icon'><IoGridOutline className="icono-grid-mapa" onClick={props.onClick} /></Link> : <Link to="/mapa" className='icono-grid-mapa nav-icon'><IoMapOutline onClick={props.onClick} /></Link>;

    return (
        <>
            {source}
        </>
    );
}

export default Switch;