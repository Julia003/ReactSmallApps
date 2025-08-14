"use client";

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const imageInputRef = useRef();
  const [pickedImg, setPickedImg] = useState();

  function handlePickClick() {
    imageInputRef.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setPickedImg(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImg(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImg && <p>No image picked yet</p>}
          {pickedImg && (
            <Image src={pickedImg} alt="The image selected by user" fill />
          )}
        </div>
        <input
          required
          className={classes.input}
          ref={imageInputRef}
          type="file"
          id={name}
          name={name}
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
