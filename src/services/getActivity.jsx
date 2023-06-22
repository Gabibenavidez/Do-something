import axios from "axios";

/* stablish a BASE_URL to be used across all the component/s */
/* environment variables can be found in .env.example (for good practice purposes only) */ 
const BASE_URL = "http://www.boredapi.com/api/activity";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
  })

/* get request to a random activity */
export const getRandom = () => {
    return axiosInstance.get(BASE_URL)
    .then((res) => {
        return res.data;
    })
    .catch((error) => console.log(error))
}

/* get request to an activity by the number of paticipants */ 
export const getByParticipants = (value) => {
    return axiosInstance.get(`${BASE_URL}?participants=${value}`)
    .then((res) => {
        return res.data;
    })
    .catch((error) => console.log(error))
}

/* get request to an activity by his type */
export const getByType = (value) => {
    return axiosInstance.get(`${BASE_URL}?type=${value}`)
    .then((res) => {
        return res.data;
    })
    .catch((error) => console.log(error))
}


