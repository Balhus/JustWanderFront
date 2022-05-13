import { useEffect, useContext, useState } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GlobalContext from "../../GlobalContext";
import './ComercioDetalle.css'

function RatingSize({ valoracion, comerceId }) {
  const [value, setValue] = useState(0)
  const [votado, setVotado] = useState(false)
  const [mensaje, setMensaje] = useState("")
  const [numVotos, setNumVotos] = useState(0)

  const { idUser } = useContext(GlobalContext)

  useEffect(() => {
    if (valoracion) {
      setValue(parseInt(valoracion))
    }
    if (comerceId && idUser) {
      const objeto = {
        idUsuario: idUser,
        idComercio: comerceId,
      }

      const opciones = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(objeto)
      }

      const opcionesAll = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ idComercio: comerceId })
      }

      fetch("http://localhost:3030/api/comercio/valoracionUsuario", opciones)
        .then(response => response.json())
        .then(response => {
          if (response.ok) {
            setVotado(response.data.votado)
            fetch("http://localhost:3030/api/comercio/valoracion/all", opcionesAll)
              .then(response => response.json())
              .then(response => {
                setNumVotos(response.numVotos)
              })
          } else {
            console.log(response.data)
          }

        })
        .catch(err => console.log(err))
    }


  }, [votado])

  const handleValorar = (val) => {
    console.log(val)
    if (!val) {
      val = value;
    }
    const objeto = {
      valoracion: val,
      idUsuario: idUser,
      idComercio: comerceId,
      votado: true
    }

    const opciones = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(objeto)
    }

    fetch("http://localhost:3030/api/comercio/valorar", opciones)
      .then(response => response.json())
      .then(response => {
        if (response.ok) {
          setVotado(response.data.votado)
          setMensaje("¡Gracias por votar!")
        } else {
          console.log(response.data)
        }
      })
      //Coger la nueva puntuacion y redondearla y ponerla en setValue
      .catch(err => console.log(err))
  }

  let rating = null;



  if (votado) {
    rating = <Rating name="size-large" value={value} onChange={(event, newValue) => {
      if (!newValue) {

        setValue(value);
      } else {
        setValue(newValue);
      }
      handleValorar(newValue)
    }} size="large" readOnly />

  } else {
    rating = <Rating name="size-large" value={value} onChange={(event, newValue) => {
      if (!newValue) {

        setValue(value);
      } else {
        setValue(newValue);
      }
      handleValorar(newValue)
    }} size="large" />
  }


  return (
    <>
      <p className="valoracion-title" component="legend">¿Te ha gustado?</p>
      <div className="rating-container">
        {rating}
        <div className="valoracion-numvotos">({numVotos})</div>
      </div>
      {mensaje}
    </>
  )
}

export default RatingSize;