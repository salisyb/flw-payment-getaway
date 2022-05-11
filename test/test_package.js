const axios = require("axios");

const getFacebook = () => {
  const config = {
    method: "get",
    url: "https://wwww.facebook.com",
  };

  axios(config)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

console.log(getFacebook());
