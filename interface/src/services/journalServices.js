import axios from "axios"

export let getJournal = (journalUUID) => {

  console.log("journalUUID", journalUUID)

  return axios.get(`/fakeData/journal/${journalUUID}.json`)
    .then(function (response) {
      console.log("garden response", response)
      return response.data
    })
    .catch(function (error) {
      console.log('error', error)
    })
}
