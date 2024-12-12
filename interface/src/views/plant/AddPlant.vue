<template>
  <div>
    <AddEditPlantForm name="dodaj swoją rośline" :callback="savePlant" />
  </div>
</template>

<script setup>
import AddEditPlantForm from "@/views/plant/AddEditPlantForm.vue"
import {savePlant} from "@/services/plantsService.js"

const components = {
  AddEditPlantForm
}


</script>
