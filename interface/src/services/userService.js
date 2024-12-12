import axios from 'axios'

export const getUser = (userUUID) => {
  return axios.get(`/fakeData/users/${userUUID}.json`)
    .then(function (response) {
      console.log("user response", response)
      return response.data
    })
    .catch(function (error) {
      console.log('error', error)
    })
}
export const createUser = (newUserData) => {
  console.log('new user data', newUserData)

  return axios.post('http://127.0.0.1:9000/api/create-user', newUserData)
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.error(error)
    })
}
