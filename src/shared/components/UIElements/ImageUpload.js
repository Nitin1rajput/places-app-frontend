import React, { useRef, useState, useEffect } from "react";
import Button from "../FormElements/Button";
import "./ImageUpload.css";
const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [isValid, setIsValid] = useState(false);
  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreview(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);
  const pickedHandler = (e) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      console.log(pickedFile);
      setFile(pickedFile);
      setIsValid(true);
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  return (
    <div className="form-control">
      <input
        onChange={pickedHandler}
        id={props.id}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        ref={filePickerRef}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {preview ? (
            <img src={preview} alt="Preview" />
          ) : (
            <p>Please pick an image</p>
          )}
        </div>
      </div>
      <Button type="button" onClick={pickImageHandler}>
        PICK IMAGE
      </Button>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};
export default ImageUpload;
