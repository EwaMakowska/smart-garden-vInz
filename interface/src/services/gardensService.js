import axios from "axios"

export let getAllGardens = () => {
  return axios.get("/fakeData/getGardens.json")
    .then(function (response) {
      console.log("gardens response", response)
      return response.data
    })
    .catch(function (error) {
      console.log('error', error)
    })
}

export let getGarden = (gardenUUID) => {

  console.log("uuuid", gardenUUID)

  return axios.get(`/fakeData/garden/${gardenUUID}.json`)
    .then(function (response) {
      console.log("garden response", response)
      return response.data
    })
    .catch(function (error) {
      console.log('error', error)
    })
}
