<template>
  <div class="w-100" id="species-requiment" v-if="species.data">


    <div class="w-100 mb-4">
      <h5 class="text-success">Wymagania dla gatunku {{species.data.name}}:</h5>
    </div>


    <div class="w-100 mb-2 d-flex justify-content-start align-items-center">
      <label class="badge black">Stanowisko:</label>&nbsp;{{species.data.sunExposureOption.label}}
    </div>


    <div class="w-100 mb-2 d-flex justify-content-start align-items-center">
      <label class="badge black">Zalecane nawadnianie:</label>&nbsp;{{species.data.watering.liters}} l / {{species.data.watering.period}} dni
    </div>


    <div class="w-100 mb-2 d-flex justify-content-start align-items-center">
      <label class="badge black">Zimowanie:</label>&nbsp;
      {{species.data.watering.wintering.winteringOption.label}}
      <span class="text-small">w okresie:</span>&nbsp;
      {{formISOStringDateToDisplay(species.data.watering.wintering.dateFrom)}}&nbsp;&mdash;&nbsp;{{formISOStringDateToDisplay(species.data.watering.wintering.dateTo)}}
    </div>


    <div class="w-100 mb-2 d-flex justify-content-start align-items-center">
      <label class="badge black">Rekomendowana temperatura:</label>&nbsp;{{species.data.recommendedTemperature.min}}&nbsp;&mdash;&nbsp;{{species.data.recommendedTemperature.max}}
    </div>


    <div
        v-if="species.data.overWateringSymptoms.length > 0"
        class="w-100 mb-2 d-flex flex-column justify-content-center align-items-start"
    >
      <label class="badge black">Objawy przelania:</label>
      <ul class="m-0 list-with-circle pl-5">
        <li v-for="(symptom, index) in species.data.overWateringSymptoms" :key="index">{{symptom}}</li>
      </ul>
    </div>
    <div
        v-else
        class="w-100 mb-2"
    >
      <label class="badge black">Objawy przelania:</label>&nbsp;
      <span>-</span>
    </div>


    <div
        v-if="species.data.dryingOutSymptoms.length > 0"
        class="w-100 mb-2 d-flex flex-column justify-content-center align-items-start"
    >
      <label class="badge black">Objawy przesuszenia:</label>&nbsp;
      <ul class="m-0 list-with-circle pl-5">
        <li v-for="(symptom, index) in species.data.dryingOutSymptoms" :key="index">{{symptom}}</li>
      </ul>
    </div>
    <div
        v-else
        class="w-100 mb-2"
    >
      <label class="badge black">Symptopy przesuszenia:</label>&nbsp;
      <span>-</span>
    </div>


  </div>
</template>

<script setup>
  import {onMounted, ref} from "vue"
  import {getData} from "@/services/servicesHelper.js"
  import {getSpecies} from "@/services/speciesServices.js"
  import {formISOStringDateToDisplay} from "@/views/utils/dateTimeHelper.js"

  const props = defineProps({
    species_id: String,
  });

  let species = ref({
    data: null,
    isLoading: false,
    error: null
  })

  onMounted(async () => {
    await getData(getSpecies, [props.species_id], species)
  })
</script>
