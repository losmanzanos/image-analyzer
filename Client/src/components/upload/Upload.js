import React, { useState } from "react";
import { storage } from "../firebase/index";
import "./Upload.css";
import loadImg from "../images/loading.gif";
import Gallery from "../gallery/Gallery";
import ImageApiService from "../../services/image-api-service";

const FileUpload = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState([]);
  const [features, setFeatures] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      let imageURL;
      const uploadTask = storage.ref(`images/${file.name}`).put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(file.name)
            .getDownloadURL()
            .then(async (url) => {
              imageURL = url;
              setUrl(url);
              await ImageApiService.postImage(url);
              return ImageApiService.getLabel(url);
            })
            .then(async (features) => {
              await ImageApiService.postFeatures(
                imageURL,
                features.responses[0].webDetection.bestGuessLabels
              );

              setLastUpdate(new Date());
              setLoading(false);
              await document
                .getElementById("results")
                .classList.remove("hidden");
            }, 1000);
        }
      );
    } catch (err) {
      console.error(err.message);
    } finally {
    }
  };

  return (
    <>
      {loading ? (
        <div>
          <img id="load" src={loadImg} alt="loading" />
        </div>
      ) : (
        <div id="results" className="hidden"></div>
      )}

      <div className="buttons">
        <form onSubmit={onSubmit}>
          <input
            type="file"
            id="custom"
            style={{ display: "none" }}
            onChange={onChange}
          />
          <input
            type="button"
            value="Browse"
            onClick={() => document.getElementById("custom").click()}
          />
          <input type="submit" value="Upload" />
        </form>
      </div>
      <Gallery lastUpdate={lastUpdate} />
    </>
  );
};

export default FileUpload;

// const onSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   try {
//     var formdata = new FormData();
//     formdata.append("file", file, file);

//     var requestOptions = {
//       method: "POST",
//       body: formdata,
//       redirect: "follow",
//     };

//     const response = await fetch(
//       "http://localhost:9001/uploads",
//       requestOptions
//     );

//     const result = await response.json();
//     console.log(result);
//     setLoading(false);
//     const features = await getLabel(result.data);
//     console.log(result, features);

//     setFeatures(features);
//   } catch (error) {
//     console.log(error);
//     setLoading(false);
//   }
// };
