<template>
  <form id="add-edit-species-form">
    <div class="row m-0 p-0 mb-4">
      <div class="col-12 m-0 p-0 text-center">
        <h3 class="text-uppercase">
          {{ formLabel }}
        </h3>
      </div>
    </div>


    <div
      class="rowm-0 p-0 mb-4"
    >
      <div class="col-12 m-0 p-0">
        <span class="badge black m-0 p-0 mb-2">
          Nazwa gatunku:
        </span>
        <input
          type="text"
          class="form-control"
          placeholder="wpisz nazwę gatunki"
          v-model="species.name"
        />
      </div>
    </div>


    <div class="row m-0 p-0 mb-4">
      <div class="col-6 m-0 p-0 pe-1">
        <span class="badge black m-0 p-0 mb-2">
          Stanowisko:
        </span>
        <select
          class="form-select"
          v-model="species.sunExposureOption._id"
          v-if="sunExposeOptions.data"
        >
          <option selected disabled value="">wybierz zalecane stanowisko...</option>
          <option
              v-for="position in sunExposeOptions.data"
              :key="position._id"
              :value="position._id"
          >
            {{ position.label }}
          </option>
        </select>
      </div>

      <div class="col-6 m-0 p-0 ps-1">
        <div class="col-12 m-0 p-0 form-outline">
        <span class="badge black m-0 p-0 mb-2">
          Region pochodzenia rośliny:
        </span>
          <input
            type="text"
            class="form-control"
            placeholder="wpisz region pochodzenia rośliny ..."
            v-model="species.originRegion"
          />
        </div>

      </div>
    </div>


    <div class="row m-0 p-0 mb-4">
      <div class="col-12 m-0 p-0">
         <span class="badge black mb-2">
          Wymagania temperaturowe:
        </span>
        <div class="w-100 d-flex justify-content-between">
          <div
            class="input-group"
            id="from-temperature"
          >
            <div class="input-group-prepend">
              <span class="input-group-text">min:</span>
            </div>
            <input type="number" class="form-control" v-model="species.recommendedTemperature.max">
            <div class="input-group-append">
              <span class="input-group-text">&deg;C</span>
            </div>
          </div>
          &nbsp;&mdash;&nbsp;
          <div
            class="input-group"
            id="to-temperature"
          >
            <div
              class="input-group-prepend"
            >
              <span class="input-group-text">max:</span>
            </div>
            <input type="text" class="form-control" v-model="species.recommendedTemperature.min">
            <div class="input-group-append">
              <span class="input-group-text">&deg;C</span>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="row m-0 p-0 mb-4">
      <div class="col-12 m-0 p-0">
        <span class="badge black mb-1">
          Zalecane podlewanie:
        </span>
        <div class="w-100 d-flex justify-content-around" id="recommended-temperature">
          <div id="watering-liters-container" class="input-group">
            <input
              type="text"
              id="howmuch-water"
              class="form-control"
              placeholder="ile wody"
              v-model="species.watering.liters"
            />
            <div class="input-group-append">
            <span class="input-group-text h-100">
              l.
            </span>
            </div>
          </div>
          &nbsp;/&nbsp;
          <div id="watering-period-container" class="input-group">
            <input
              type="text"
              id="watering-period"
              class="form-control"
              placeholder="co ile?"
              v-model="species.watering.period"
            />
            <div class="input-group-append">
              <span class="input-group-text h-100">
                dni
               </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row m-0 p-0 mb-4">
      <div class="col-12 m-0 p-0">

        <div class="row m-0 p-0">
          <div class="col-12 m-0 p-0">
            <span class="badge black mb-2">Rekomendacje zimowania:</span>
            <p><small>*Rekomendacje zimowania odpowiadają za okres, kiedy roślina powinna być mniej podlewana dla odpoczynku. Ustawienie ich nie jest wymagane, jedak w przyszłości system będzie analizował te dane w celu lepszych podpowiedzi jak dbać o roślinę oraz zmniejszyć zużycie wody. Rekomendacje te są używane w panelu dodawania rośliny, ale można je nadpisać.</small></p>
          </div>
        </div>

        <div class="row m-0 p-0">
          <div class="col-4 m-0 p-0  pe-2">
            <span class="badge black mb-2">Sposób zimowania:</span>
            <select
              class="form-select wintering-types"
              v-model="species.watering.wintering.winteringOption._id"
              v-if="winteringOptions.data"
              ref="wintering-types-selector"
            >
              <option selected disabled value="">wybierz zalecenia zimowania ...</option>
              <option v-for="option in winteringOptions.data" :key="option._id" :value="option._id">
                {{ option.label }}
              </option>
            </select>
          </div>

          <div class="col-8 m-0 p-0">
            <div class="row m-0 p-0">
              <div class="col-12 m-0 p-0">
                <span class="badge black mb-2">
                  W okresie:
                </span>
              </div>
            </div>
            <div class="row">
              <div class="col-12 d-flex justify-content-around align-items-center">
                <BootstrapDatepicker
                    set-placeholder="od"
                    :setDate="species.watering.wintering.dateFrom"
                    @update-items="updateDateFrom"
                />
                <span class="m-0 p-0 mx-1">&mdash;</span>
                <BootstrapDatepicker
                    set-placeholder="do"
                    :setDate="species.watering.wintering.dateTo"
                    @update-items="updateDateTo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="row m-0 p-0 mb-4">
      <div class="col-6 m-0 p-0">
        <AddEditListPanel
            label="Symptomy przelania"
            :items="Array.isArray(species.overWateringSymptoms)? species.overWateringSymptoms.slice(): []"
            tip="Dodaj symptom"
            @update-items="updateOverWateringSymptoms"
        />
      </div>
    </div>


    <div class="row m-0 p-0 mb-4">
      <div class="col-6 m-0 p-0">
        <AddEditListPanel
            label="Symptomy przesuszenia"
            :items="Array.isArray(species.dryingOutSymptoms)? species.dryingOutSymptoms.slice(): []"
            tip="Dodaj symptom"
            @update-items="updateDryingOutSymptoms"
        />
      </div>
    </div>
  </form>
</template>

<script setup>
import {ref, onMounted} from "vue"
import {
  getAllSunExposeOptions,
  getAllWinteringOptions
} from "@/services/optionsServices.js"
import {getData} from "@/services/servicesHelper.js"
import AddEditListPanel from "@/components/AddEditListPanel.vue"
import BootstrapDatepicker from "@/components/BootstrapDatepicker.vue"
import {speciesSchema} from "@/views/species/schema.js"

const components = {
  AddEditListPanel,
  BootstrapDatepicker
}

const props = defineProps({
  formLabel: String,
  species: {
    type: Object, default: () => (speciesSchema)
  }
})

let sunExposeOptions = ref({
  data: null,
  isLoading: false,
  error: null
})

let winteringOptions = ref({
  data: null,
  isLoading: false,
  error: null
})

const updateOverWateringSymptoms = (newItems) => {
  props.species.overWateringSymptoms = (newItems)
}
const updateDryingOutSymptoms = (newItems) => {
  props.species.dryingOutSymptoms = newItems
}
const updateDateFrom = (newItem) => {
  props.species.watering.wintering.dateFrom = newItem
}

const updateDateTo = (newItem) => {
  props.species.watering.wintering.dateTo = newItem
}

onMounted(async() => {
  await getData(getAllSunExposeOptions, [], sunExposeOptions)
  await getData(getAllWinteringOptions, [], winteringOptions)
})
</script>

<style>
#from-temperature,
#to-temperature,
#watering-liters-container,
#watering-period-container {
  width: auto;
}
</style>
