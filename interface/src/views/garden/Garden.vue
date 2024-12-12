<template>
  <div
    id="garden"
    class="card border-success p-4 mx-auto basic-card-size"
    v-if="garden.data"
  >
      <h1 class="text-success text-center w-100">
        {{garden.data.name}}
      </h1>
      <div>
        <h3>Podpięte rośliny:</h3>
        <ul class="list-with-circle pl-5">
          <li v-for="(plant, index) in garden.data.plants" :key="index">
            {{plant}}
          </li>
        </ul>
      </div>
    <h3>Aktywne czujniki:</h3>
    <ul class="list-with-circle pl-5">
      <li v-for="(sensor, index) in garden.data.sensors" :key="index" class="text-success">
        {{sensor}}: OK
      </li>
    </ul>
    <h3>Opis:</h3>
    <div class="text-justify">
      {{garden.data.description}}
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getGarden} from "@/services/gardensService.js"
import {getData} from "@/services/servicesHelper.js"

const props = defineProps({
  uuid: String,
});

let garden = ref({
  data: null,
  isLoading: false,
  error: null
})

onMounted(() => {
  getData(getGarden, [props.uuid], garden)
})
</script>
