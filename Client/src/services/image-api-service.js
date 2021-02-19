import TokenService from "./token-service";
import config from "../../src/config";

const ImageApiService = {
  getLabel(url) {
    console.log(url);
    return fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${config.KEY}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          requests: [
            {
              features: [
                {
                  type: "WEB_DETECTION",
                },
              ],
              image: {
                source: {
                  imageUri: url,
                },
              },
            },
          ],
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.error(err);
      });
  },

  getImages() {
    return fetch(`${config.API_ENDPOINT}/images`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  postImage(imageURL) {
    return fetch(`${config.API_ENDPOINT}/images`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        imageURL,
      }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  postFeatures(imageURL, features) {
    return fetch(`${config.API_ENDPOINT}/features`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        imageURL,
        features,
      }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getFeatures(image_id) {
    return fetch(`${config.API_ENDPOINT}/features/${image_id}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  deleteImage(image_id) {
    return fetch(`${config.API_ENDPOINT}/images/${image_id}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      method: "DELETE",
    });
  },
};

export default ImageApiService;
