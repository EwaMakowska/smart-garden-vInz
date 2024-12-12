<template>
  <div
    v-if="species.data"
    id="edit-species">
    <AddEditSpeciesForm formLabel="Edytuj dane gatunku" :species="species.data" />
    <button
        @click="edit"
        class="btn btn-outline-success w-100"
        type="button"
    >
      ZAPISZ
    </button>
  </div>
</template>

<script setup>
import {ref, watch} from "vue"
import {getData} from "@/services/servicesHelper.js"
import {
  getSpecies,
  updateSpecies
} from "@/services/speciesServices.js"
import AddEditSpeciesForm from "@/views/species/AddEditSpeciesForm.vue"

const props = defineProps({
  speciesUUID: String | null,
  refreshOnSave: Function | null
})

const components = {
  AddEditSpeciesForm
}

const emit = defineEmits(['close-modal']);

let species = ref({
  data: null,
  isLoading: false,
  error: null
})

const edit = async () => {
  await updateSpecies(species.value.data, props.speciesUUID)
  props.refreshOnSave()
  emit('close-modal')
}

watch(() => props.speciesUUID, async (isSpeciesUUID) => {
  if(isSpeciesUUID) {
    await getData(getSpecies, [isSpeciesUUID], species)
  }
}, {immediate: true})
</script>
