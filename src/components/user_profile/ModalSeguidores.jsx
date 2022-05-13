import { Modal, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../GlobalContext";
import { useContext } from 'react'

function ModalSeguidores(props) {
    let rows = "";
    console.log(props.followers)
    const { setLastPage } = useContext(GlobalContext);

    const navigateTo = useNavigate();

    const goTo = (x) => {
        navigateTo(x)
        setLastPage("/userProfile");
    };

    if (props.followers) {

        rows = props.followers.map((el) => {
            let imprimir = el.nombre_usuario + " | " + (el.puntuacion > -1 ? el.puntuacion : "");

            return (
                <div key={el.id} className='followers-div cursor-pointer2' onClick={() => { goTo("/user/" + el.id) }}>
                    {imprimir}
                    <hr />
                </div>);
        })
    }

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        FOLLOWERS
                    </Modal.Title>
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
}

export default ModalSeguidores;