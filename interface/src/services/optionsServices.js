import axios from "axios";

export let getAllSunExposeOptions = () => {
    return axios.get(`http://localhost:9000/options/sun-exposure-options`)
        .then(function (response) {
            console.log("get all sun exposure options", response)
            return response.data
        })
        .catch(function (error) {
            console.log('error', error)
        })
}

export let getAllWinteringOptions = () => {
    return axios.get(`http://localhost:9000/options/wintering-options`)
        .then(function (response) {
            console.log("get all wintering options", response)
            return response.data
        })
        .catch(function (error) {
            console.log('error', error)
        })
}

export let getAllDevelopmentLevelOptions = () => {
    return axios.get(`http://localhost:9000/options/development-level-options`)
        .then(function (response) {
            console.log("get all development level options", response)
            return response.data
        })
        .catch(function (error) {
            console.log('error', error)
        })
}