import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import GlobalContext from './GlobalContext';
import jwt_decode from "jwt-decode";
import 'leaflet/dist/leaflet.css'

import Formulario from './components/form_reg_user/Formulario'
import ComerciosMain from './components/ComerciosMain'
import ComercioDetalle from './components/comercio_detalle/ComercioDetalle'
import RegistroComercio from './components/form_new_commerce/RegistroComercio'
import Login from './components/Login/Login'
import NavBar from './components/NavBar'
import Eventos from './components/Eventos'
import Mapa from './components/map/Mapa'
import RevisarPeticion from './components/revision_peticion/RevisarPeticion'
import PerfilUsuarioLogeado from './components/user_profile/PerfilUsuarioLogeado'
import PerfilUsuario from './components/user_profile/PerfilUsuario'
import EditarPerfil from './components/user_profile/EditarPerfil'
import AdminPanel from './components/admin_panel/AdminPanel'
import Usuarios from './components/Usuarios'
import { FaGlasses } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';


function App() {
  const [lastPage, setLastPage] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [idUser, setIdUser] = useState(0)
  const [comercios, setComercios] = useState([])
  const [rol, setRol] = useState(-1)
  const [map, setMap] = useState(true);
  const [yScrollPosition, setYScrollPosition] = useState(0)

  function goMap() {
    setMap(!map);
  }

  const contexto = { rol, currentPage, setCurrentPage, lastPage, setLastPage, comercios, setComercios, token, setToken, username, idUser, goMap, map, setMap, setYScrollPosition, yScrollPosition }
  //If the User leaves the page, still will be logged as long as doesnt log out
  useEffect(() => {
    const tk = localStorage.getItem('loginfront');
    if (tk) {
      setToken(tk)
    }
  }, [])

  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token);
      setUsername(decoded.nom);
      setIdUser(decoded.id)
      setRol(decoded.rol)

      localStorage.setItem('loginfront', token);
    } else {
      setUsername('');
      setIdUser('')
      setRol(-1)
    }
  }, [token])

  const location = useLocation();

  return (
    <GlobalContext.Provider value={contexto}>

      <NavBar />
      <AnimatePresence exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          {/* <Route path="/" element={<App />}> */}
          <Route index element={<ComerciosMain />} />
          <Route path="mapa" element={<Mapa style={{ height: '100vh', width: '100%' }}
            comercios={comercios}
            zoomLevel={3} />} />
          <Route path="registro" element={token ? <PerfilUsuarioLogeado /> : <Formulario />} />
          <Route path="detalle_comercio/:id" element={<ComercioDetalle />} />
          <Route path="registroComercio" element={token ? <RegistroComercio /> : <Login />} />
          <Route path="revision" element={token ? <RevisarPeticion /> : <Login />} />
          <Route path="login" element={<Login />} />
          <Route path="eventos" element={<Eventos />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="userProfile" element={token ? <PerfilUsuarioLogeado /> : <Login />} />
          <Route path="user/:id" element={<PerfilUsuario />} />
          <Route path="adminPanel" element={token && rol === 1 ? <AdminPanel /> : <ComerciosMain />} />
          <Route path="userProfile/edit" element={token ? <EditarPerfil /> : <Login />} />

          {/* </Route> */}
        </Routes>
      </AnimatePresence>
    </GlobalContext.Provider>
  )
}

export default App;
