<template>
  <div class="w-100" id="plants">
    <div v-for="plant in plants.data" :key="plant.uuid" class="card w-100 mt-2 mb-1 d-flex flex-column flex-md-row justify-content-between border-success" style="width: 18rem;">
      <div class="card-body d-flex m-0 p-0">
        <img class="card-img-left rounded float-left" :src="'src/assets/plants-photos/user-123/' + plant.mainPhoto" alt="" style="width:150px;height:150px;">
        <div class="card-content p-2 flex-grow-1">
          <h1 class="text-success text-center w-100">{{plant.name}}:</h1>
          <p class="card-text">OD: {{formISOStringDateToDisplay(plant.createdDate)}}</p>
        </div>
      </div>
      <div class="card-actions py-2 px-md-2 d-flex flex-row flex-md-column justify-content-around bg-success">
        <router-link :to="`/plant/${plant._id}`" class="btn btn-info" style="width:85px; height:40px">zobacz</router-link>
        <router-link :to="`/edit-plant/${plant._id}`" class="btn btn-warning my-md-1" style="width:85px; height:40px">edytuj</router-link>
        <router-link :to="`/journal/${user._id}`" class="btn btn-orange" style="width:85px; height:40px">dziennik</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import {onMounted, ref} from 'vue'
import {getAllPlants} from "@/services/plantsService.js"
import {getData} from "@/services/servicesHelper.js"
import {formISOStringDateToDisplay} from "@/views/utils/dateTimeHelper.js";

let plants = ref({
  data: null,
  isLoading: false,
  error: null
})

let user = ref("")

onMounted(async () => {
  user = JSON.parse(localStorage.getItem("user"))
  await getData(getAllPlants, [], plants)
})

</script>
