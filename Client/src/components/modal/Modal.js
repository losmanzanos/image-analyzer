import React, { useEffect, useState } from "react";
import "./Modal.css";
import imageAPIService from "../../services/image-api-service";

const Modal = (props) => {
  const [features, setFeatures] = useState([]);
  useEffect(() => {
    if (!props.show.id) {
      return;
    }
    imageAPIService
      .getFeatures(props.show.id)
      .then((data) => setFeatures(data));
  }, [props.show.id]);

  if (!props.show) {
    return null;
  }

  const closeModal = () => {
    props.setShow(false);
  };

  const deleteImage = () => {
    imageAPIService.deleteImage(props.show.id).then(() => {
      props.getData();
      closeModal();
    });

    console.log("Deleted!");
  };

  return (
    <div className="modal" key={props.id}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <img className="modal-image" src={props.show.url} />
        {features.map((feature) => (
          <p>
            Label:{" "}
            {feature.label.replace(/(?:^|\s)\S/g, function (a) {
              return a.toUpperCase();
            })}
          </p>
        ))}
        <br />
        <button onClick={deleteImage}>Delete</button>
      </div>
    </div>
  );
};

export default Modal;
