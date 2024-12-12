<template>
  <div
      id="plant"
      class="card border-success p-4 mx-auto big-card-size"
      v-if="plant.data"
  >
    <div class="w-100 d-flex mb-4" id="plant-main-data">
      <div class="plant-main-image-container">
        <div
            :style="`background-image: url('/src/assets/plants-photos/${user.uuid}/${plant.data.mainPhoto}')`"
            id="plant-image-preview"
        ></div>
      </div>
      <div class="plant-main-data-container mb-4">
        <div class="w-100 m-0 p-0 mb-2 d-flex justify-content-center">
          <h3 class="text-uppercase d-flex justify-content-center text-success w-100 p-0 m-0 mb-4">
            {{ plant.data.name }}
          </h3>
          <router-link
              :to="`/shared-plant/${plant.data.uuid}`"
              v-tippy="'Podziel się rośliną'"
              class="m-0 p-1"
          >
            <font-awesome-icon class="text-success" icon="share-from-square" />
          </router-link>
        </div>
        <div class="w-100 mb-2 d-flex justify-content-start align-items-center development-level-item auto-height">
          <div class="w-100 m-0 p-0">
            <span class="badge black">Profil założono:</span>&nbsp;{{formISOStringDateToDisplay(plant.data.createdDate)}}
          </div>
          <div
            class="text-success border-success btn btn-circle btn-success"
            v-if="developmentLevel"
            v-tippy="{
              content: developmentLevel.name,
              placement: 'right'
            }"
          >
            <img
                :src='`/src/assets/icons/plants/${developmentLevel.icon}`'
                :data-level-id='developmentLevel.id'
            />
          </div>
        </div>
      </div>
    </div>
        <Species
            :species_id="plant.data.species"
        />
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue"
import {getPlant} from "@/services/plantsService.js"
import {getData} from "@/services/servicesHelper.js"
import plantDevelopmentLevels from "@/enums/plantDevelopmentLevels.js"
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"
import Species from "@/views/species/Species.vue"
import {formISOStringDateToDisplay} from "@/views/utils/dateTimeHelper.js"

const components = {
  Species
}

const props = defineProps({
  uuid: String,
});

let user = ref(JSON.parse(localStorage.getItem("user")))
let developmentLevel = ref(null)
let plant = ref({
  data: null,
  isLoading: false,
  error: null
})

onMounted(async () => {
  await getData(getPlant, [props.uuid], plant)
  developmentLevel.value = plantDevelopmentLevels.find((item) => {
    return item.id === plant.value.data.developmentLevel
  })
})

</script>

<style>
@import url('/src/assets/css/development-level.css');

.plant-main-image-container {
  width: 30%;
}

#plant-image-preview {
  width: 200px;
  height: 200px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid black;
  border-radius: var(--bootstrap-radius);
  margin: 0 auto;
}

#plant-main-data {
  flex-direction: column-reverse;
  width: 100%;
}

.plant-main-data-container {
  width: 100%;
}

.plant-main-image-container {
  width: 100%;
}

@media (min-width: 920px) {
  #plant-main-data {
    flex-direction: row;
  }

  .plant-main-data-container {
    width: 70%;
  }

  .plant-main-image-container {
    width: 30%;
  }

  #plant-image-preview {
    margin: 0;
  }
}

</style>
