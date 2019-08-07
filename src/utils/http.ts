import axios from "axios";

const ax = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// ax.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     return Promise.reject(error.response);
//   }
// );

export default ax;
