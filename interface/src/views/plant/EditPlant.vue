<template>
  <div
    id="edit-plant"
    v-if="plant.data"
  >
    <AddEditPlantForm formName="Edytuj roślinę" :plant="plant.data" :callback="updatePlant"/>
  </div>
</template>
<script setup>
import AddEditPlantForm from "@/views/plant/AddEditPlantForm.vue"
import {onMounted, ref} from "vue"
import {getPlant} from "@/services/plantsService.js"
import {getData} from "@/services/servicesHelper.js"
import {updatePlant} from "@/services/plantsService.js"

const components = {
  AddEditPlantForm
}

const props = defineProps({
  _id: String,
});

let plant = ref({
  data: null,
  isLoading: false,
  error: null
})

onMounted(async () => {
  await getData(getPlant, [props._id], plant)

  console.log("plant", plant)

})
</script>
