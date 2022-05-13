import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'
import Api from '../../utils/Api';
import { MdEmail, MdLock } from "react-icons/md";
import { HiEye, HiEyeOff } from "react-icons/hi"
import { Button, Row, Col, Container } from "react-bootstrap";
import GlobalContext from '../../GlobalContext';

const Login = () => {
  const [email, setEmail] = useState("")
  const [password1, setPassword1] = useState("")
  const [messageEmail, setMessageEmail] = useState('');
  const [emailClass, setEmailClass] = useState('');
  const [messagePassword1, setMessagePassword1] = useState('');
  const [show, setShow] = useState(false)
  const [password1Class, setPassword1Class] = useState('');
  const [error, setError] = useState("");
  const { setToken, lastPage } = useContext(GlobalContext)

  let allCorrect = true;
  const handleClick = e => {
    e.preventDefault();
    setShow(!show);
  }

  const navigateTo = useNavigate();

  const goTo = (x) => {
    navigateTo(x)


  };


  const validatePassword1 = e => {
    let vp1 = e.target.value;
    console.log(vp1);
    setPassword1(vp1);
    if (vp1.length < 8 && vp1.length > 0) {
      setMessagePassword1("Mínimo 8 caracteres");
      setPassword1Class("is-invalid");

      allCorrect = false;
    }
    else if (vp1.length >= 8) {
      setMessagePassword1(" ");
      setPassword1Class("is-valid");
    } else {
      setMessagePassword1(" ");
      setPassword1Class("md-3");
    }
  };

  const validateEmailLine = e => {
    let vel = e.target.value;
    setEmail(vel);

    const validateEmail = mail => {
      return String(mail)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }

    if (validateEmail(vel)) {
      setMessageEmail(" ");
      setEmailClass("is-valid");
    } else {
      setMessageEmail(" ");
      setEmailClass("md-3");
      if (vel.length > 0) {
        setMessageEmail("Formato incorrecto");
        setEmailClass("is-invalid");
        allCorrect = false
      }
    };
  };

  function handleLogin() {
    Api.login(email, password1)
      .then(resp => {
        if (resp.ok === true) {
          setToken(resp.token);
          goTo(lastPage)
          console.log("login correct")
        } else {
          console.log("resp", resp)
          setError("Login incorrecto!!");
        }
      })
      .catch(e => console.log(e))
  }

  return (
     
        <Container className=" loginPrueba ">
          <Row ms="12" className="colorPrueba">
            <Col lg="12" md="9" ms="6">
              <div className="login">

                <div className="login-right">
                  <h1>Login</h1>

                  <div className={"login-loginInputEmail " + emailClass}>
                    <MdEmail />
                    <input
                      type="email"
                      placeholder="E-mail"
                      onInput={validateEmailLine}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                    {messageEmail}
                  </div>

                  <div className={"login-loginInputPassword " + password1Class}>
                    <MdLock />
                    <input
                      placeholder="Contraseña"
                      type={show ? "text" : "password"}
                      
                      value={password1}
                      onInput={(e) => { setPassword1(e.target.value); validatePassword1(e) }}

                    />
                    {messagePassword1}
                    <div className="login-eye">
                      {show ? (
                        <HiEye
                          size={20}
                          onClick={handleClick}
                        />
                      ) : (
                        <HiEyeOff
                          size={20}
                          onClick={handleClick}
                        />
                      )}
                    </div>
                  </div>
                
                  <div className="button-enter">
                  {error}
                    <div className="button" onClick={handleLogin}>
                      Entra
                      {/* <p className="answer-choice">Entrar</p> */}
                    </div>
                  </div>
                  {/* <Button className="enter" type="button" onClick={handleLogin}>

                  </Button> */}
                  <div className="button-register">
                    <h4>ó crea una cuenta</h4>
                    <div className="button" onClick={() => goTo("/registro/")}>
                      Registro
                      {/* <p class="answer-choice">Entrar</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      
  )
}

export default Login;