import axios from "axios";

export let getSharedPlants = () => {
  return axios.get(`/fakeData/getSharedPlants.json`)
    .then(function (response) {
      console.log("garden response", response)
      return response.data
    })
    .catch(function (error) {
      console.log('error', error)
    })
}
