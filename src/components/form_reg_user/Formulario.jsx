import { useState, useContext } from "react";
import { Form, Button, Modal, Container, Row, Col } from "react-bootstrap";
import Error from "./Error";
import Ok from "./Ok";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../GlobalContext";
import './formulario.css'
import { HiEye, HiEyeOff } from "react-icons/hi"

const validateEmail = (mail) => {
    return String(mail)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

function Formulario(props) {

    const [show, setShow] = useState(false);
    const [showRepetir, setShowRepetir] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState(''); //useState('aaa@bbb.com')
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [ok, setOk] = useState(false);
    const [error, setError] = useState(false);
    const [messageName, setMessageName] = useState('');
    const [messageLastName, setMessageLastName] = useState('');
    const [messageUserName, setMessageUserName] = useState('');
    const [messageEmail, setMessageEmail] = useState('');
    const [messagePassword1, setMessagePassword1] = useState('');
    const [messagePassword2, setMessagePassword2] = useState('');
    const [nameClass, setNameClass] = useState('');
    const [lastNameClass, setLastNameClass] = useState('');
    const [userNameClass, setUserNameClass] = useState('');
    const [emailClass, setEmailClass] = useState('');
    const [password1Class, setPassword1Class] = useState('');
    const [password2Class, setPassword2Class] = useState('');

    const [showPasswords, setShowPasswords] = useState(false)
    const [showPasswordsRepetir, setShowPasswordsRepetir] = useState(false)

    const [readOnlySwitch, setReadOnlySwitch] = useState('');

    let allCorrect = true;

    const handleClick = e => {
        e.preventDefault();
        setShow(!show);
        setShowPasswords(!showPasswords)
    }

    const handleClickRepetir = e => {
        e.preventDefault();
        setShowRepetir(!showRepetir);
        setShowPasswordsRepetir(!showPasswordsRepetir)
    }

    //Context
    const Context = useContext(GlobalContext)

    const navigateTo = useNavigate();

    const goTo = (x) => {
        navigateTo(x)
    };

    function validateName(e) {
        let vn = e.target.value;
        setName(vn);
        if (vn.length > 0 && !vn.trim()) {
            setMessageName("No puede estar vacío");
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

    function validateLastName(e) {
        let vln = e.target.value;
        setLastName(vln);
        if (vln.length > 0 && !vln.trim()) {
            setMessageLastName("No puede estar vacío");
            setLastNameClass("is-invalid");
            allCorrect = false;
        } else if (vln !== null && vln.length !== 0) {
            setMessageLastName(" ");
            setLastNameClass("is-valid");
        } else {
            setMessageLastName(" ");
            setLastNameClass("md-3");
        }
    };

    function validateUserName(e) {
        let vun = e.target.value;
        setUserName(vun);
        if (vun.includes(" ")) {
            setMessageUserName("El username no debe contener espacios");
            setUserNameClass("is-invalid");
            allCorrect = false;
        } else {
            if (vun !== null && (vun.length > 5 && vun.length < 10)) {
                setMessageUserName(" ");
                setUserNameClass("is-valid");
            } else {
                setMessageUserName(" ");
                setUserNameClass("md-3");
            }
        }
    };



    function validateEmailLine(e) {
        let vel = e.target.value;
        setEmail(vel);

        const validateEmail = (mail) => {
            return String(mail)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };

        if (validateEmail(vel)) {
            setMessageEmail(" ");
            setEmailClass("is-valid");
        } else {
            setMessageEmail(" ");
            setEmailClass("md-3");
            if (vel.length > 0) {
                setMessageEmail(" ");
                setEmailClass("md-3");
                allCorrect = false
            }
        }
    }



    function validatePassword1(e) {
        let vp1 = e.target.value;
        setPassword1(vp1);
        if (vp1.length < 8 && vp1.length > 0) {
            setMessagePassword1("La contraseña debe tener al menos 8 caracteres");
            setPassword1Class("is-invalid");
            if (vp1 !== password2 && password2.length > 0) {
                setMessagePassword2("Las contraseñas no coinciden");
                setPassword2Class("is-invalid");
            } else {
                if (vp1 == password2 && password2.length > 0) {
                    setMessagePassword2(" ");
                    setPassword2Class("is-valid");
                } else {
                    setMessagePassword2(" ");
                    setPassword2Class("md-3");
                }
            }
            allCorrect = false;
        }
        if (vp1.length >= 8) {
            setMessagePassword1(" ");
            setPassword1Class("is-valid");
        } else {
            setMessagePassword1(" ");
            setPassword1Class("md-3");
        }
        if (vp1 !== password2 && password2.length > 0) {
            setMessagePassword2("Las contraseñas no coinciden");
            setPassword2Class("is-invalid");
            allCorrect = false;
        }
        if (vp1 == password2 && password2.length > 0) {
            setMessagePassword2(" ");
            setPassword2Class("is-valid");
        }
    };

    function validatePassword2(e) {
        let vp2 = e.target.value;
        setPassword2(vp2);
        if (vp2 !== password1 && vp2.length > 0) {
            setMessagePassword2("Las contraseñas no coinciden");
            setPassword2Class("is-invalid");
            allCorrect = false;
        }
        if (vp2 == password1 && vp2.length > 0) {
            setMessagePassword2(" ");
            setPassword2Class("is-valid");
        } else {
            setMessagePassword2(" ");
            setPassword2Class("md-3");
        }
    };

    function submitForm(e) {
        e.preventDefault();
        let allCorrect = true;

        if (name.length > 0 && !name.trim()) {
            setMessageName("No puede estar vacío");
            setNameClass("is-invalid");
            allCorrect = false
        }
        if (name.length === 0) {
            setMessageName("Obligatorio");
            setNameClass("is-invalid");
            allCorrect = false
        } else {
            
                setMessageName(" ");
                setNameClass("is-valid");
            
        }

        if (lastName.length > 0 && !lastName.trim()) {
            setMessageLastName("No puede estar vacío");
            setLastNameClass("is-invalid");
            allCorrect = false
        }
        if (lastName.length === 0) {
            setMessageLastName("Obligatorio");
            setLastNameClass("is-invalid");
            allCorrect = false
        } else {
            
                setMessageLastName(" ");
                setLastNameClass("is-valid");
            
        }

        if (userName.includes(" ")) {
            setMessageUserName("El username no debe contener espacios");
            setUserNameClass("is-invalid");
            allCorrect = false;
        }
        if (userName.length === 0) {
            setMessageUserName("El username debe tener entre 5 y 10 caracteres");
            setUserNameClass("is-invalid");
            allCorrect = false
        }
        if ((userName.length < 5 || userName.length > 10)) {
            setMessageUserName("El username debe tener entre 5 y 10 caracteres");
            setUserNameClass("is-invalid");
            allCorrect = false;
        } else {
            if (!userName.includes(" ")) {
                setMessageUserName(" ");
                setUserNameClass("is-valid");
            }
        }

        if (password1 !== password2) {
            setMessagePassword2("Las contraseñas no coinciden");
            setPassword2Class("is-invalid");
            allCorrect = false
        } else {
            if (password1.length >= 8) {
                setMessagePassword2(" ");
                setPassword2Class("is-valid");
            } else {
                setMessagePassword2(" ");
                setPassword2Class("md-3");
            }
        }
        if (password1.length >= 8) {
            setMessagePassword1(" ");
            setPassword1Class("is-valid");
        } else {
            setMessagePassword1("La contraseña debe tener al menos 8 caracteres");
            setPassword1Class("is-invalid");
            allCorrect = false
        }


        if (!validateEmail(email)) {
            setMessageEmail("Formato de email incorrecto");
            setEmailClass("is-invalid");
            allCorrect = false
        } else {
            if (validateEmail(email))
                setMessageEmail(" ");
            setEmailClass("is-valid");
        }
        if (email.length === 0) {
            setMessageEmail("Obligatorio");
            setEmailClass("is-invalid");
            allCorrect = false
        }


        if (allCorrect) {

            const newUser = {
                nombre: name,
                apellidos: lastName,
                email: email,
                nombre_usuario: userName,
                password: password1,
                activo: 1
            }

            const opciones = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            };

            fetch("http://localhost:3030/api/usuario/registro", opciones)
                .then(res => res.json())
                .then(res => {
                    if (res.ok === true) {
                        console.log("Usuario registrado");
                        goTo("/login")
                    } else {
                        console.log(res);
                    }
                })
                .catch((err) => console.log("Error: " + err.message));

            setOk(true);
            setError(false);
            setReadOnlySwitch({ readOnly: true });
        } else {
            setError(true)
        }
    }

    function resetForm() {
        setName('');
        setLastName('');
        setUserName('');
        setEmail('');
        setPassword1('');
        setPassword2('');
        setReadOnlySwitch({ readOnly: false });
        setShowPasswords(false);
        setNameClass('md-3');
        setLastNameClass('md-3');
        setUserNameClass('md-3');
        setEmailClass('md-3');
        setPassword1Class('md-3');
        setPassword2Class('md-3');
        setMessageName('');
        setMessageLastName('');
        setMessageUserName('');
        setMessageEmail('');
        setMessagePassword1('');
        setMessagePassword2('');
        setOk(false);
        setError(false);
    }

    return (
        <>
            <Container className="container-form">
                <Row className="row-form">



                    {/* <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            > */}

                    <Form className="form-user-reg" onSubmit={submitForm}>
                        {/* <Modal.Header closeButton onClick={resetForm}> */}
                        <h1>Registro</h1>

                        {error ? <Error /> : null}
                        {/* {ok ? <Ok /> : (
                            <>

                            </>
                        )} */}
                        <Row>
                            <Col className="col-form" xs="6">
                                <Form.Group className="mb-3-form" controlId="formBasicEmail">
                                    <Form.Control
                                        {...readOnlySwitch}
                                        className={nameClass}
                                        required
                                        value={name}
                                        onInput={validateName}
                                        type="text"
                                        placeholder="Nombre" />
                                    <Form.Text>
                                        {messageName}
                                    </Form.Text>
                                </Form.Group>
                            </Col>

                            <Col className="col-form" xs="6">
                                <Form.Group className="mb-3-form" controlId="formBasicEmail">
                                    <Form.Control
                                        {...readOnlySwitch}
                                        className={lastNameClass}
                                        required
                                        value={lastName}
                                        onInput={validateLastName}
                                        type="text"
                                        placeholder="Apellido" />
                                    <Form.Text>
                                        {messageLastName}
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col className="col-form" md="6">
                                <Form.Group className="mb-3-form" controlId="formBasicEmail">
                                    <Form.Control
                                        {...readOnlySwitch}
                                        className={userNameClass}
                                        required
                                        value={userName}
                                        onInput={validateUserName}
                                        type="text"
                                        placeholder="Username" />
                                    <Form.Text>
                                        {messageUserName}
                                    </Form.Text>
                                </Form.Group>
                            </Col>

                            <Col className="col-form" md="6">
                                <Form.Group className="mb-3-form" controlId="formBasicEmail">
                                    <Form.Control
                                        {...readOnlySwitch}

                                        className={emailClass}
                                        required
                                        value={email}
                                        onInput={validateEmailLine}
                                        type="text"
                                        placeholder="E-mail" />
                                    <Form.Text>
                                        {messageEmail}
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col className="col-form" md="6">
                                <div className={password1Class + " register-registerPassword form-control"} id="formBasicPassword">
                                    <input
                                        {...readOnlySwitch}
                                        required
                                        value={password1}
                                        onInput={validatePassword1}
                                        type={showPasswords ? "text" : "password"}
                                        placeholder="Contraseña" />



                                    <div className="login-eye">
                                        {show ? (
                                            <HiEye
                                                size={20}
                                                onClick={handleClick}
                                                className="eye-black"
                                            />
                                        ) : (
                                            <HiEyeOff
                                                size={20}
                                                onClick={handleClick}
                                                className="eye-black"
                                            />
                                        )}
                                    </div>
                                </div>
                            </Col>
                            <div className="msg-error-form">
                                {messagePassword1}
                            </div>
                            <Col className="col-form" md="6">
                                <div className={password2Class + " register-registerPassword form-control"} id="formBasicPassword">
                                    <input
                                        {...readOnlySwitch}
                                        required
                                        value={password2}
                                        onInput={validatePassword2}
                                        type={showPasswordsRepetir ? "text" : "password"}
                                        placeholder="Repetir contraseña" />

                                    <div className="login-eye">
                                        {showRepetir ? (
                                            <HiEye
                                                size={20}
                                                onClick={handleClickRepetir}
                                                className="eye-black"
                                            />
                                        ) : (
                                            <HiEyeOff
                                                size={20}
                                                onClick={handleClickRepetir}
                                                className="eye-black"
                                            />
                                        )}
                                    </div>
                                </div>
                            </Col>
                        <div className="msg-error-form">
                            {messagePassword2}
                        </div>
                        </Row>


                        <Row className="buttons">
                            <Col className="col-form-2">
                                <div className="button-container">
                                    <div className="button3" onClick={resetForm}>
                                        Reset
                                        {/* <p className="answer-choice">Entrar</p> */}
                                    </div>
                                </div>

                                <div className="button-container">
                                    <div className="button2" onClick={submitForm}>
                                        Enviar
                                        {/* <p className="answer-choice">Entrar</p> */}
                                    </div>
                                </div>
                            </Col>
                        </Row>


                    </Form>

                </Row>
            </Container>
        </>
    );
}

export default Formulario;