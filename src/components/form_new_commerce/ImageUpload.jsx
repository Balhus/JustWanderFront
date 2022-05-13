import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import { BsPlusLg } from 'react-icons/bs'
import './RegistroComercio.css'

function FotoUpload({ preview, onSelectFile, index }) {
  console.log("Index: ", index)
  return (
    <>
      {preview[index + 1] ? <img className='foto-subida-registro' src={preview[index + 1]} /> : <>
        <Form.Label htmlFor="upload-photo-register" className='label-new-photo-style cursor-pointer2'><BsPlusLg className='simbolo-foto-registro' /></Form.Label>
        <Form.Control type="file" name="file" id="upload-photo-register" onChange={(e) => { onSelectFile(e); console.log(preview) }} />
      </>}
    </>
  );
}

//TODO: Verificar cuando suben una File que no sea fotografia, poder borrar la fotografia
function ImageUpload({ useFoto }) {
  const [selectedFile, setSelectedFile] = useFoto;
  const [preview, setPreview] = useState([])
  const [numFotos, setNumFotos] = useState(0)

  let newArrSelectedFiles = [...selectedFile];

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (selectedFile[numFotos]) {
      const objectUrl = URL.createObjectURL(selectedFile[numFotos])

      if (preview.length < 0) {
        setPreview(objectUrl)
      } else {
        setPreview([...preview, objectUrl])
      }

      createNewUpload();
      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl)
    }
  }, [selectedFile])

  function onSelectFile(e) {
    newArrSelectedFiles.push(e.target.files[0])
    setSelectedFile(newArrSelectedFiles)
  }

  function createNewUpload() {
    setNumFotos(numFotos + 1);
  }

  const newArrayFotos = []
  for (let i = 0; i < numFotos; i++) {
    newArrayFotos.push(<FotoUpload preview={preview} onSelectFile={onSelectFile} index={i} />)
  }

  return (
    <Form.Group className="mb-3 h-100">
      <div className='container-fotos-registro h-100'>
        {preview[0] ? <img className='foto-subida-registro primera-foto' src={preview[0]} /> : <>
          <Form.Label htmlFor="upload-photo-register" className='label-new-photo-style cursor-pointer2'><BsPlusLg className='simbolo-foto-registro' /></Form.Label>
          <Form.Control type="file" name="file" id="upload-photo-register" onChange={(e) => onSelectFile(e)} />
        </>
        }
        {newArrayFotos}

        {/* {selectedFile && <img src={preview} />} */}
      </div>
    </Form.Group>
  )
}

export default ImageUpload;