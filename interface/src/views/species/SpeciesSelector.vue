<template>
  <div
    v-if="speciesNamesList.data"
    id="species-selector"
  >
    <div class="w-100 p-0 m-0 mb-1">
      <div class="badge black">
        Wybierz gatunek z listy, albo dodaj nowy
      </div>
    </div>
    <div class="w-100 d-flex justify-content-start">
      <select
        id="select-species"
        class="form-select"
        v-model="selectedSpecies"
      >
        <option selected disabled value="">wybierz gatunek...</option>
        <option
          v-for="species in speciesNamesList.data"
          :key="species._id"
          :value="species._id"
        >
          {{ species.name }}
        </option>
      </select>
      <BootstrapModal
        openingButtonID="add-species-opening-button"
        :show-header="true"
        isOpeningButtonDisabled=""
        tooltipText="Dodaj dane gatunku"
        :force-close="shouldClose"
      >
        <template #openingButton>
          <font-awesome-icon
            icon="a-solid fa-plus"
          />
        </template>
        <template #modalTitle>
          <span>Zarządzaj gatunkami</span>
        </template>
        <template #modalBody>
          <AddSpecies
              :refreshOnSave="refreshSpeciesNamesList"
              @close-modal="handleModalClose"
          />
        </template>
      </BootstrapModal>
      <BootstrapModal
        openingButtonID="edit-species-opening-button"
        :show-header="true"
        :isOpeningButtonDisabled="isEditButtonDisabled()"
        tooltipText="Edytuj dane gatunku"
        :force-close="shouldClose"
      >
        <template #openingButton>
          <font-awesome-icon
            icon="a-solid fa-pencil"
          />
        </template>
        <template #modalTitle>
          <span>Zarządzaj gatunkami</span>
        </template>
        <template #modalBody>
          <EditSpecies
              :speciesUUID="selectedSpecies"
              :refreshOnSave="refreshSpeciesNamesList"
              @close-modal="handleModalClose"
          />
        </template>
      </BootstrapModal>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {getData} from "@/services/servicesHelper.js"
import {getSpeciesNamesList} from '@/services/speciesServices.js'
import BootstrapModal from "@/components/BootstrapModal.vue"
import EditSpecies from "@/views/species/EditSpecies.vue"
import AddSpecies from "@/views/species/AddSpecies.vue"

const components = {
  BootstrapModal,
  EditSpecies,
  AddSpecies
}

const props = defineProps({
  currentSpecies_id: String | "",
  mode: "String"
})
const emit = defineEmits(['update-species']);


let shouldClose = ref(false)
const handleModalClose = () => {
  //zmieniamu i potem resetujemy wartość
  shouldClose.value = true
  resetShouldClose()
}

const resetShouldClose = () => {
  setTimeout(() => {
    shouldClose.value = false
  }, 1000)
}

let selectedSpecies = ref("")

let speciesNamesList = ref({
  data: null,
  isLoading: false,
  error: null
})


const isEditButtonDisabled = () => {
  if(selectedSpecies.value || props.currentSpeciesUUID) {
    return ""
  }
  return 'disabled'
}
const refreshSpeciesNamesList = async() => {
  await getData(getSpeciesNamesList, [], speciesNamesList)
}

watch(() => selectedSpecies.value, async(valueChangeTo) => {
  emit('update-species', valueChangeTo)
})

onMounted(async () => {

  console.log("props", props)

  if(props.currentSpecies_id) {
    selectedSpecies.value = props.currentSpecies_id
  }
  await refreshSpeciesNamesList()
})

</script>

<style>
#select-species {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

#add-species-opening-button,
#edit-species-opening-button {
  border: var(--bs-border-width) solid var(--bs-border-color);
}

#add-species-opening-button {
  border-left: none;
  border-right: none;
  border-radius: 0;
}

#edit-species-opening-button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
