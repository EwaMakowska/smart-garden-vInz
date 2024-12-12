import axios from "axios"
import {showNotification} from "@/utils/basic-notification.js"

// export let getAllSpecies = () => {
//     return axios.get(`/fakeData/getSpecies.json`)
//         .then(function (response) {
//             console.log("garden response", response)
//             return response.data
//         })
//         .catch(function (error) {
//             console.log('error', error)
//         })
// }

export let getSpecies = (species_id) => {
    return axios.get(`http://localhost:9000/species/item/${species_id}`)
        .then(function (response) {
            console.log("get species by id", response)
            return response.data;
        })
        .catch(function (error) {
            console.log('error', error);
        });

    // return axios.get('http://localhost:9000/species/item', {
    //     params: {
    //         species: species._id
    //     }
    // })
    //     .then(function (response) {
    //         console.log("get species by id", response)
    //         return response.data;
    //     })
    //     .catch(function (error) {
    //         console.log('error', error);
    //     });
}


export let getSpeciesNamesList = () => {
    return axios.get(`http://localhost:9000/species/names-list`)
        .then(function (response) {
            console.log("species names list", response)
            return response.data
        })
        .catch(function (error) {
            console.log('error', error)
        })
}

export let saveSpecies = (species) => {
    return axios.post('http://localhost:9000/species/save-species',
        {
            species
        }, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            showNotification(response.data, "success")
            console.log("save species", response)
            return response.data
        })
        .catch(function (error) {
            showNotification(error.response.data, "danger")
            console.log('save species error', error)
        })
}

export let updateSpecies = (species, speciesOID) => {
    axios.put(`http://localhost:9000/species/update-species/${speciesOID}`,
        {
            species
        }, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            console.log('update species response: ', response)
            return response.data
        })
        .catch(function (error) {
            console.log('error', error)
        })
}

// export let getSpeciesData = (speciesUUID) => {
//     return axios.get(`/fakeData/species/${speciesUUID}.json`)
//         .then(function (response) {
//             console.log("garden response", response)
//             return response.data
//         })
//         .catch(function (error) {
//             console.log('error', error)
//         })
// }
