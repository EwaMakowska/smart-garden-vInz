<template>
  <div
    id="edit-use-profile"
    class="card border-success p-4 mx-auto basic-card-size"
    v-if="user.data"
  >
    <div class="row p-0 m-0 mb-4">
      <div class="col-12">
        <h2 class="text-success text-center mb-4">Profil Użytkownika</h2>
      </div>
    </div>


    <form class="p-0 m-0 mb-4 mt-2">
      <div class="row m-0 p-0">
        <div class="col-12 m-0 p-0">
          <h4>
            Zmień login:
          </h4>
        </div>
      </div>
      <div class="row m-0 p-0">
        <div class="col-6 form-outline m-0 p-0">
          <span class="badge black mb-2">
            Login użytkownika
          </span>
          <input
            type="text"
            class="form-control w-100"
            v-model="user.data.login"
          />
        </div>
        <div class="col-6 d-flex align-items-end m-0 p-0">
          <button class="btn btn-outline-secondary w-100">ZAPISZ</button>
        </div>
      </div>
    </form>


    <form class="m-0 p-0 mb-4">
      <div class="row m-0 p-0">
        <div class="col-12 m-0 p-0">
          <h4>Zmień hasło:</h4>
        </div>
      </div>
      <div class="row m-0 p-0 mb-2">
        <div class="col-4 m-0 p-0">
          <span class="badge black mb-1">Obecne hasło:</span>
          <PasswordField/>
        </div>
        <div class="col-4 m-0 p-0">
          <span class="badge black m-1">Nowe hasło:</span>
          <PasswordField/>
        </div>
        <div class="col-4 m-0 p-0">
          <span class="badge black mb-1">Powrórz nowe hasło:</span>
          <PasswordField/>
        </div>
      </div>
      <div class="row m-0 p-0">
        <div class="col-12 m-0 p-0">
          <button class="btn btn-outline-secondary w-100">ZMIEŃ HASŁO</button>
        </div>
      </div>
    </form>


    <form class="m-0 p-0 mb-4">

      <div class="row m-0 p-0">
        <div class="col-12 m-0 p-0">
          <h4>Metryczka:</h4>
        </div>
      </div>

      <div class="row m-0 p-0">
        <div class="col-12 m-0 p-0">
          <p>*Metryczka nie jest obowiązkowa, ale zdobyte dzięki niej dane mogą rozwinąć badania.</p>
        </div>
      </div>

      <div class="row m-0 p-0 mb-2">
        <div class="col-6 m-0 p-0 pe-1">
            <span class="badge black mb-1">
              Płeć:
            </span>
            <select class="form-control w-100" id="gender" v-model="user.data.gender">
              <option value="">Wybierz...</option>
              <option value="0">Kobieta</option>
              <option value="1">Mężczyzna</option>
              <option value="2">Nie chcę podawać</option>
            </select>
        </div>
        <div class="col-6 m-0 p-0 ps-1">
            <span class="badge black mb-1">
              Wiek:
            </span>
            <select class="form-control w-100" id="age" v-model="user.data.age">
              <option value="">Wybierz...</option>
              <option value="0">poniżej 18 lat</option>
              // pokolenie Z i alfa młodsze (niepełnoletni)
              <option value="1">19 - 24 lat</option>
              //pokolenie Z i alfa (pełnoletni)
              <option value="2">25 - 40 lat</option>
              //pokolenie Y
              <option value="3">41 - 56 lat</option>
              //pokolenie X
              <option value="4">57 i powyżej</option>
              //baby boomers
            </select>
        </div>
      </div>

      <div class="row m-0 p-0 mb-2">
        <div class="col-6 m-0 p-0 pe-1">
          <span class="badge black mb-1">
            Wykształcenie:
          </span>
          <select class="form-control w-100" id="education" v-model="user.data.education">
            <option value="">Wybierz...</option>
            <option value="0">brak, nieukończona szkoła podstawowa</option>
            <option value="1">podstawowe</option>
            <option value="2">średnie</option>
            <option value="3">wyższe</option>
          </select>
        </div>
        <div class="col-6 m-0 p-0 ps-1">
          <span class="badge black mb-1">
            Miejsce zamieszkania:
          </span>
          <select
              class="form-control w-100"
              id="populationOfResidentPlace"
              v-model="user.data.populationOfResidentPlace"
          >
            <option value="">Wybierz...</option>
            <option value="0">wieś</option>
            <option value="1">miasto do 50 tyś.</option>
            <option value="2">miasto od 50 tyś. do 150 tyś.</option>
            <option value="3">miasto od 150 tyś do 500 tyś.</option>
            <option value="4">miasto powyżej 500 tyś.</option>
          </select>
        </div>
      </div>

      <div class="row m-0 p-0">
        <div class="col-12 m-0 p-0">
          <button class="btn btn-outline-secondary w-100">ZAPISZ</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>

import {onMounted, ref} from "vue"
import {getData} from "@/services/servicesHelper.js"
import {getUser} from "@/services/userService.js"
import PasswordField from "@/components/PasswordField.vue"

let components = {
  PasswordField
}

let user = ref({
  data: null,
  isLoading: false,
  error: null
})

onMounted(async () => {
  user = await getData(getUser, [JSON.parse(localStorage.getItem("user")).uuid], user)
})
</script>
