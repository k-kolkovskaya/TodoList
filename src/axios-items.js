import axios from "axios";

const instance = axios.create({
    baseURL: "https://to-do-list-c1ef9.firebaseio.com/"
});

export default instance;