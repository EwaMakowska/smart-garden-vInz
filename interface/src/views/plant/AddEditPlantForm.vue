<template>
  <form
      id="add-plant-form"
      class="card border-success p-4 mx-auto basic-card-size"
  >
    <div class="row mb-4">
      <div class="col-12 text-center">
        <h3 class="text-uppercase">{{ formName }}</h3>
      </div>
    </div>

    <div class="row m-0 p-0 mb-4">
      <div class="col-12 m-0 p-0">
        <div class="row m-0 p-0">
          <div class="col-6 m-0 p-0 pe-1">
        <span class="badge black p-0 m-0 mb-2 text-start">
          Nazwa rośliny
        </span>
            <input
                type="text"
                class="form-control"
                placeholder="nadaj roślinie jakąś nazwę..."
                v-model="plant.name"
            />
          </div>
          <div class="col-6 m-0 p-0 ps-1 form-outline">
            <SpeciesSelector
                @update-species="updatePlantSpecies"
                :currentSpecies_id="plant.species"
            />
          </div>
        </div>
      </div>
    </div>


    <div class="row m-0 p-0 mb-4">
      <div class="col-12 m-0 p-0 ">
        <DevelopmentLevel
            @update-development-level="updatePlantDevelopmentLevel"
            :developmentLevel="plant.developmentLevel"
        />
      </div>
    </div>

    <div class="row p-0 m-0 mb-4 ">
      <div
        class="col-12 m-0 p-0 "
        v-if="plant._id"
      >
        <div class="row m-0 p-0 ">
          <span class="badge black p-0 m-0 mb-2 text-start">
            Zdjęcie główne:
          </span>
        </div>
        <div class="row m-0 p-0">
          <div class="col-12 m-0 p-0 ">
            <BootstrapModal
              openingButtonID="go-to-photos-panel"
              :show-header="true"
            >
              <template #openingButton>
                Zmień zdjęcie
              </template>
              <template #modalTitle>
                <span>Zarządzaj zdjęciami</span>
              </template>
              <template #modalBody>
                <PhotosPanel
                    :user_id="plant.user_id"
                    :plant_id="plant._id"
                />
              </template>
            </BootstrapModal>
            <div
              id="image-preview"
              :style="`background-image: url(/src/assets/plants-photos/${user.uuid}/${plant.mainPhoto})`"
            ></div>
          </div>
        </div>
      </div>
    </div>


    <div class="row m-0 p-0">
      <div class="col-12 m-0 p-0 p-2">
        <button
            type="button"
            class="btn btn-outline-secondary w-100"
            @click="saveForm"
        >
          ZAPISZ
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="js">
import {onMounted, ref} from "vue"
import DevelopmentLevel from "@/views/plant/DevelopmentLevel.vue"
import PhotoFileInput from "@/components/PhotoFileInput.vue"
import BootstrapModal from "@/components/BootstrapModal.vue"
import PhotosPanel from "@/views/plantPhotos/PhotosPanel.vue"
import SpeciesSelector from "@/views/species/SpeciesSelector.vue"
import {plantSchema} from "@/views/plant/schema.js"
// import {uploadPhoto} from "@/services/plantPhotosServices.js"
import {savePlantPhoto} from "@/services/plantPhotosServices.js"
import router from "@/router/index.js";

const components = {
  DevelopmentLevel,
  PhotoFileInput,
  BootstrapModal,
  PhotosPanel,
  SpeciesSelector
}

const props = defineProps({
  formName: String,
  callback: Function,
  plant: {
    type: Object, default: () => (plantSchema)
  }
});

let user = ref('')

const updatePlantSpecies = (value) => {
  props.plant.species = value
}

const updatePlantDevelopmentLevel = (value) => {
  props.plant.developmentLevel = value
}

const saveForm = async () => {
  props.plant.user_id = user._id
  let newPlantData_id = await props.callback(props.plant)
  router.push({ name: 'edit-plant', params: { _id: newPlantData_id } })
  // console.log("newPhotoData", newPlantDataData_id)
  // photoData.plant_id = newPlantDataData_id
  // photoData.user_id = user.uuid

  // let plantPhoto = {
  //   name: props.plant.mainPhoto,
  //   user_id: user.uuid,
  //   plant_id: "cdsfvresou",
  //   isMain: true,
  //   file: photoData.binary
  // }

  // await savePlantPhoto(plantPhoto)


}

onMounted(() => {
  user = JSON.parse(localStorage.getItem("user"))


})
</script>

<style>
@import "../../assets/css/plant-photo.css";
</style>
