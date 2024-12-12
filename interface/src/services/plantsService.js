import axios from "axios"
import {showNotification} from "@/utils/basic-notification.js";

export let getAllPlants = () => {
    return axios.get("http://localhost:9000/plants")
        .then(function (response) {
            console.log("get all plants response", response)
            return response.data
        })
        .catch(function (error) {
            console.log('error', error)
        })

    //   return axios.get("/fakeData/getPlants.json")
//     .then(function (response) {
//       console.log("plants response", response)
//       return response.data
//     })
//     .catch(function (error) {
//       console.log('error', error)
//     })
}

export let getPlant = (plant_id) => {
  return axios.get(`http://localhost:9000/plants/item/${plant_id}`)
    .then(function (response) {
      console.log("get plant response", response)
      return response.data
    })
    .catch(function (error) {
      console.log('error', error)
    })
}


export let savePlant = (plant) => {
    console.log("save plant data", plant)

    return axios.post('http://localhost:9000/plants/save-plant',
        {
            plant
        }, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            showNotification(response.data.message, "success")
            console.log("save plant", response)
            return response.data.id
        })
        .catch(function (error) {
            showNotification(error.response.data, "danger")
            console.log('save plant error', error)
        })
}

export let updatePlant = (plant) => {
    let plant_id = plant._id
    axios.put(`http://localhost:9000/plants/update-plant/${plant_id}`,
        {
            plant
        }, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            console.log('update plant response: ', response)
            return response.data
        })
        .catch(function (error) {
            console.log('error', error)
        })
}
