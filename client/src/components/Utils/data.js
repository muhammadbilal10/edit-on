import axios from "axios";

export function getCreators() {
  // Fetch data from your backend API when the component mounts
  return axios
    .get(`${import.meta.env.VITE_NODE_API}getCreators`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
