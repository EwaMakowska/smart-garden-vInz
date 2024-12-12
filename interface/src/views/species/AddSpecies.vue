<template>
  <div
    id="add-species">
    <AddEditSpeciesForm formLabel="Dodaj gatunek" :species="species"/>
    <button
        @click="add"
        class="btn btn-outline-success w-100"
        type="button"
    >
      ZAPISZ
    </button>
  </div>
</template>

<script setup>
import AddEditSpeciesForm from "@/views/species/AddEditSpeciesForm.vue"
import {saveSpecies} from "@/services/speciesServices.js"
import {speciesSchema} from "@/views/species/schema.js"
import {ref} from "vue"

let props = defineProps({
  refreshOnSave: Function | null
})

const emit = defineEmits(['close-modal']);

let species = ref(speciesSchema)
const add = async () => {
  await saveSpecies(species.value);
  props.refreshOnSave()
  emit('close-modal')
}
</script>
