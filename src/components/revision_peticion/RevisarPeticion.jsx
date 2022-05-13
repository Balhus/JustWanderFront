import './revisar.css'
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react'
import GlobalContext from '../../GlobalContext';


function RevisarPeticion() {

    const { lastPage, currentPage } = useContext(GlobalContext)

    const navigateTo = useNavigate();

    const goTo = (x) => {
        navigateTo(x)
    };

    console.log(currentPage)

    return (
        <>
            <div>
                <Container>
                    <h1>Se va a revisar la aplicacion de nuevo comercio. ¡Grácias!</h1>
                    <Button onClick={() => goTo(lastPage)}>Volver</Button>
                </Container>
            </div>
        </>
    );
}

export default RevisarPeticion;

