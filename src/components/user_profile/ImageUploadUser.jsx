import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';


const Preview = styled.img`
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin-top: 12px;
    background-color: #ccc;
    border-radius: 100%;
    width: 150px;
    height:150px;
    

`;


function ImageUploadUser({ useFoto }) {
    const [selectedFile, setSelectedFile] = useFoto;
    const [preview, setPreview] = useState()

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }

    return (
        <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Foto</Form.Label>
            <Form.Control type="file" name="file" onChange={onSelectFile} />
            {selectedFile && <Preview src={preview} />}
        </Form.Group>
    )
}

export default ImageUploadUser;