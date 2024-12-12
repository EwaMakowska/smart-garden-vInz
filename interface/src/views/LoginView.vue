<template>
  <div class="container-fluid m-0 p-0 w-100 d-flex flex-column">
    <form @submit.prevent="submitForm" class="d-flex flex-column w-sm-100 w-md-50 mx-md-auto p-2">
      <!--      część:dane użytkownika-->
      <div class="d-flex flex-column mb-3">
        <div class="d-flex w-100 justify-content-center">
          <h2>Podaj dane logowania:</h2>
        </div>
        <div class="d-flex flex-column flex-md-row m-0 justify-content-start justify-content-md-between">
          <div class="d-flex flex-column form-group w-100 w-md-50 mb-2 mb-md-0 pe-md-2">
            <label class="m-0 me-md-4" for="login">Podaj Login</label>
            <input class="form-control w-100" id="login" v-model="form.login" type="text">
          </div>
          <div class="d-flex flex-column form-group w-100 w-md-50 ps-md-2">
            <label class="m-0 ms-md-4" for="password">Podaj Hasło</label>
            <input class="form-control w-100" id="password" v-model="form.password" type="password">
          </div>
        </div>
      </div>
      <div class="d-flex flex-column">
        <button class="btn btn-secondary" type="submit">Zapis</button>
      </div>
    </form>
  </div>
</template>



<script lang="js">
import { ref } from 'vue'
import {createUser} from "@/services/userService.js";

export default {
  setup() {
    const form = ref({
      login: '',
      password: '',
      gender: null,
      age: null,
      education: null,
      populationOfResidentPlace: null
    })

    function submitForm() {
      console.log("form", form.value)
      createUser(form.value)
    }

    return {
      form,
      submitForm
    }
  }
}
</script>
