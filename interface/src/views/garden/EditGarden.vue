<template>
  <div v-if="garden.data" id="edit-garden">
    <AddEditGardenForm form-name="Edytuj ogródek" :garden="garden.data"/>
  </div>

</template>

<script setup>
import {onMounted, ref} from "vue";
import {getGarden} from "@/services/gardensService.js"
import AddEditGardenForm from "@/views/garden/AddEditGardenForm.vue"
import {getData} from "@/services/servicesHelper.js"

const components = {
  AddEditGardenForm
}

const props = defineProps({
  uuid: String,
});

let garden = ref({
  data: null,
  isLoading: false,
  error: null
})

onMounted(async () => {
  await getData(getGarden, [props.uuid], garden)
})

</script>
