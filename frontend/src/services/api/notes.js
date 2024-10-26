import axios from "axios";
const url = "http://localhost:4000/notes";
export const getNotes = async () => {
  const data = await axios.get(`${url}`);
  return data;
};
