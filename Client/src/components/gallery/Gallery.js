import React, { useState, useEffect } from "react";
import ImageApiService from "../../services/image-api-service";
import Modal from "../modal/Modal";
import "./Gallery.css";

function Gallery(props) {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    getData();
    console.log("useEffect");
  }, [props.lastUpdate]);

  console.log("Gallery", data);

  const getData = () => {
    fetch(`http://localhost:9001/images`)
      .then((res) => res.json())
      .then((json) => setData(json));
  };

  const showModal = (image) => {
    setShow(image);
  };

  const images = data.map((image) => {
    return (
      <>
        <div className="image" key={image.id}>
          <img
            src={image.url}
            onClick={(e) => {
              showModal(image);
            }}
          />
        </div>

        {/* <div className="col-sm-12 col-md-4">
          <a class="lightbox" href={image.url}>
            <img
              src={image.url}
              onClick={(e) => {
                showModal(image);
              }}
            />
          </a>
        </div> */}
      </>
    );
  });

  return (
    <div className="container">
      {/* <p>Gallery</p> */}
      <Modal
        show={show}
        setShow={setShow}
        data={data}
        setData={setData}
        getData={getData}
      />
      <div className="container gallery-container">
        <div className="tz-gallery">
          <div className="row">
            <div className="content" key={data.id}>
              {images}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
