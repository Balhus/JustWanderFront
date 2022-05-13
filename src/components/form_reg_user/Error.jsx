import { useState } from "react";
import { BiErrorCircle } from "react-icons/bi";


function Error() {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <>
            <h3><BiErrorCircle /></h3>
            <h6>Por favor revisa los campos señalados en rojo</h6>
            </>
        );
    }
    return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}

export default Error;