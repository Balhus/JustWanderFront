import { useState } from "react";
import { Alert } from "react-bootstrap";


function Ok() {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert variant="success">
                <Alert.Heading>Enhorabuena!</Alert.Heading>
                <hr />
                <p>
                    Registro completado.
                </p>
            </Alert>
        );
    }
    return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}

export default Ok;