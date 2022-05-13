import { Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../GlobalContext";
import { useContext } from 'react'



function ModalUsuarios(props) {

  const { setLastPage } = useContext(GlobalContext);

  const navigateTo = useNavigate();

  const goTo = (x) => {
    navigateTo(x)
    setLastPage("/user/" + props.userId);
  };

  let rows = []

  if (props.comercios) {
    rows = props.comercios.map((el, idx) => {
      return <div key={idx} className="cursor-pointer2" onClick={() => {  goTo("/detalle_comercio/" + el.id) }}>
        {el.nombre + " " + el.valoracion}
        <hr />
      </div>
    })
  }

  return (
    <>
      <Modal
        {...props}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Todos los comercios publicados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {rows}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUsuarios;


