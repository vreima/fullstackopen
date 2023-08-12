import axios from "axios";
const baseUrl = "api/persons";

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const create = (newPerson) =>
  axios
    .post(baseUrl, newPerson)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response.data);
      throw error;
    });

const deletePerson = (id) =>
  axios
    .delete(`${baseUrl}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response.data);
      throw error;
    });

const update = (id, newPerson) =>
  axios
    .put(`${baseUrl}/${id}`, newPerson)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response.data);
      throw error;
    });

// eslint-disable-next-line
export default { getAll, create, deletePerson, update };
