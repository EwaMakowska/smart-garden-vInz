import axios from "axios"
import {showNotification} from "@/utils/basic-notification.js"

export let savePlantPhoto = (plantPhoto) => {
    console.log("save PLANT PHOTO data", plantPhoto)

    return axios.post('http://localhost:9000/plantPhotos/save-plant-photo',
        {
            plantPhoto
        }, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            showNotification(response.data.message, "success")
            console.log("save PLANT PHOTO", response)
            return response.data.id
        })
        .catch(function (error) {
            showNotification(error.response.data, "danger")
            console.log('save plant photo error', error)
        })
}

export let getUserPlantPhotos = (user_id, plant_id) => {
    return axios.get(`http://localhost:9000/plantPhotos/items/${user_id}/${plant_id}`)
        .then(function (response) {
            console.log("species names list", response)
            return response.data
        })
        .catch(function (error) {
            console.log('error', error)
        })
}

// export let uploadPhoto = (photoData) => {
//     console.log("update plant photo", photoData)
//
//     return axios.post('http://localhost:9000/plantPhotos/uploadphoto',
//         photoData,
//         {
//             headers: {
//                 'X-Requested-With': 'XMLHttpRequest',
//                 Accept: 'application/json',
//                 'Content-Type': 'multipart/form-data'
//             }
//         })
//         .then(function (response) {
//             showNotification(response.data, "success")
//             return response.data
//         })
//         .catch(function (error) {
//             showNotification(error.response.data, "danger")
//             console.log('save plant error', error)
//         })
// }

export let getAllPlantsPhotos = (userUUID) => {
  return axios.get(`/fakeData/photos/${userUUID}.json`)
    .then(function (response) {
      console.log("get plants photos", response)
      return response.data
    })
    .catch(function (error) {
      console.log('error', error)
    })
}
