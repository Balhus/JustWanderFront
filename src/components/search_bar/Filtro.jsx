import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Api from '../../utils/Api';
import { FaFilter } from 'react-icons/fa'
import { IoTrashBin } from "react-icons/io5";

function Filtro(props) {
    const [filters, setFilters] = useState([])
    const [toFilter, setToFilter] = useState([])
    const [displayFilters, setDisplayFilters] = useState(false)

    useEffect(() => {
        Api.getAllFilters()
            .then(res => {
                if (res.ok) {
                    setFilters(res.data)
                    console.log(res.data)
                } else {
                    console.log("Error getAllFilters: ", res.data)
                    setError(res.data)
                }
            })
            .catch(err => console.log("Error getAllFilters on catch Promise: ", err))
    }, [])
    console.log(toFilter)

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
                } else {
                    //Clase activo
                    setToFilter([...toFilter, val])
                }
            }
        }
        makeActive(val)
    }

    function makeActive(i) {
        var current = document.getElementById(i);

        if (i === 0) {
            var bElements = document.getElementsByClassName("activo")
            Array.from(bElements).forEach(element => {
                element.className = element.className.replace(" activo ", "");
            });

            console.log(bElements)
        } else {
            if (current.className.includes("activo")) {
                current.className = current.className.replace(" activo ", "");
            } else {
                current.className = current.className.replace("", " activo ");
            }
        }
    }

    //Maintains the active even after the search
    useEffect(() => {
        if (toFilter.length > 0 && displayFilters) {
            toFilter.forEach(filter => {
                console.log(filter)
                makeActive(filter);
            })
        }
    }, [displayFilters])

    return (
        <>
            <div className="filterButton cursor-pointer" onClick={() => { setDisplayFilters(!displayFilters); }}>
                <FaFilter />
            </div>
            {displayFilters ?
                <>
                    <div className="">
                        <div className="dataResult" value={toFilter} >
                            {/* <div className="dataResult"> */}
                            <div className='filter-element dataItem delete' id="0" onClick={(e) => { selectFilter(e) }}>
                            <IoTrashBin/>Eliminar filtros
                            </div>

                            {filters.map((value, key) => {
                                return (
                                    <div className='filter-element dataItem' id={value.id} key={key} onClick={(e) => { selectFilter(e) }}>
                                        <hr />
                                        {value.nombre}
                                    </div>
                                );
                            })}

                            {/* </div>  */}
                        </div>
                        <Button type="submit" className="btn-filter w-100" onClick={() => { props.filterBy(toFilter); setDisplayFilters(!displayFilters); }} > Buscar </Button>
                    </div>
                </>
                : ""
            }

        </>
    );
}

export default Filtro;