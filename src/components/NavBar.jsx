// import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';

// import { IoIosAdd } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsPlusLg } from "react-icons/bs";

import Switch from './Switch';
import { useContext, useState, useEffect } from 'react';
import GlobalContext from '../GlobalContext';


function NavBar() {
  const { rol, setToken, token, setLastPage, lastPage, currentPage, setYScrollPosition, goMap, map, setMap } = useContext(GlobalContext)


  console.log(lastPage, currentPage)


  function handleLogOut() {
    setToken('');
    localStorage.removeItem('loginfront');
  }

  return (
    <>
      <Navbar collapseOnSelect bg="light" expand="sm" fixed="top" className="d-none d-sm-block navbar-pc">
        <Container className="nav-lg" fluid>
          <div>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className='navbar-collapse'>
              <Nav className="me-auto">
                <Link to="/" className='nav-link' onClick={() => { setLastPage(currentPage); setMap(true); }}><GoHome /></Link>
                {token ? <Link to="/userProfile" className='nav-link' onClick={() => setLastPage(currentPage)}>Mi Perfil</Link> : <Link to="/registro" className='nav-link' onClick={() => setLastPage(currentPage)}>Registro</Link>}
                {token && rol === 1 ? <Link to="/adminPanel" className='nav-link' onClick={() => setLastPage(currentPage)}>Admin Panel</Link> : ""}
                <Link to="/usuarios" className='nav-link' onClick={() => setLastPage(currentPage)}>Usuarios</Link>
              </Nav>
            </Navbar.Collapse>
          </div>

          <div className='center-btn'>
            <span><Link to="/registroComercio" /></span>


          </div>

          <div>
            <Nav>
              <Switch onClick={goMap} mapa={map} />
              {token ? <Link to="/" className='nav-link' onClick={() => { handleLogOut(); setLastPage(currentPage) }}>Log Out</Link> : <Link to="/login" className='nav-link' onClick={() => setLastPage(currentPage)}>Log In</Link>}
            </Nav>
          </div>

        </Container>
      </Navbar>


      <Navbar
        bg="light"
        expand="sm"
        fixed="bottom"
        className="d-block d-sm-none navbar-movil">
        <Container className="nav-lg" fluid>

          <div className="burger" tabIndex="0">
            {['up'].map((direction) => (
              <DropdownButton
                as={ButtonGroup}
                key={direction}
                id={`dropdown-button-drop-${direction}`}
                drop={direction}
                variant="outline-success"
                title={<GiHamburgerMenu />}
              >
                <Dropdown.Item eventKey="1">
                  <Link to="/" className='nav-link' onClick={() => { setYScrollPosition(0); setLastPage(currentPage); setMap(true) }}><GoHome /></Link>
                </Dropdown.Item>
                <Dropdown.Item eventKey="2">
                  {token ? <Link to="/userProfile" className='nav-link' onClick={() => { setLastPage(currentPage); setYScrollPosition(0) }}>Mi Perfil</Link> : <Link to="/registro" className='nav-link' onClick={() => setLastPage(currentPage)}>Registro</Link>}
                </Dropdown.Item>
                {token && rol === 1 ?
                  <Dropdown.Item eventKey="3">
                    <Link to="/adminPanel" className='nav-link' onClick={() => setLastPage(currentPage)}>Admin Panel</Link>
                  </Dropdown.Item>
                  : ""}

                <Dropdown.Divider />

                <Dropdown.Item eventKey="4">
                  <Link to="/usuarios" className='nav-link' onClick={() => { setYScrollPosition(0); setLastPage(currentPage) }}>Usuarios</Link>
                </Dropdown.Item>
                <Dropdown.Item eventKey="6">
                  {token ? <Link to="/" className='nav-link' onClick={() => { handleLogOut(); setLastPage(currentPage) }}>Log Out</Link> : <Link to="/login" className='nav-link' onClick={() => setLastPage(currentPage)}>Log In</Link>}
                </Dropdown.Item>

              </DropdownButton>
            ))}
          </div>
          {/* btn-round */}
          <div className=" btn-round-colors">
            <Link to="/registroComercio" ><BsPlusLg className='i-btn-nuevo-comercio' /></Link>
          </div>

          <div>
            <Nav>
              <Switch onClick={goMap} mapa={map} />
            </Nav>
          </div>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar;
