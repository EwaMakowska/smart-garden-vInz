<template>
  <div id="plant-photos-panel" class="w-100">
    <div class="w-100 mb-4 d-flex justify-content-between">
      <h5>{{panelRole}}:</h5>
      <button
        type="button"
        class="btn btn-outline-secondary"
        @click="togglePanels"
      >
        {{photoPanelChangeViewLabel}}
      </button>
    </div>
    <div
      id="plant-photos-panel"
      class="w-100 m-0 p-0"
      v-if="activePanel==='photos-preview-panel'"
    >
      <div
        class="form-check plant-item-container p-0 d-flex justify-content-center"
        v-for="photo in plantPhotos.data"
        :key="photo.uuid"

      >
        <div class="radio-input">
          <input
            class="form-check-input  m-0"
            type="radio"
            name="select-photo"
            :id="`photo-${photo.uuid}`"
            :value="`${photo.uuid}`"
            v-model="selectedPhoto"
          >
        </div>
        <label
          class="photo-item"
          :style="`background-image: url('/src/assets/plants-photos/${userUUID}/${photo.file}')`"
          :for="`photo-${photo.uuid}`"
        ></label>
      </div>
    </div>
    <div
      class="w-100"
      v-if="activePanel==='add-new-photo-panel'"
    >
        <PhotoFileInput
            :userUUID="user.uuid"
            @handleFileUpload="updatePhotoData($event)"
        />
      <button
          type="button"
          @click="savePhoto"
          class="btn btn-outline-success w-100"
      >
        DODAJ
      </button>
    </div>
  </div>
</template>

<script setup>
import {getData} from "@/services/servicesHelper.js"
import {onMounted, ref} from "vue"
import {getUserPlantPhotos} from "@/services/plantPhotosServices.js"
import PhotoFileInput from "@/components/PhotoFileInput.vue"

const components = {
  PhotoFileInput
}

const props = defineProps({
  user_id: String,
  plant_id: String
});

let activePanel = ref('photos-preview-panel')
let panelRole = ref('Wybierz główne zdjecie')
let photoPanelChangeViewLabel = ref('Dodaj zdjęcie')
let user = ref(null)
let selectedPhoto = ref(null)
let plantPhotos = ref({
  data: null,
  isLoading: false,
  error: null
})

let photoBinary = null

function togglePanels() {
  if(activePanel.value === 'photos-preview-panel') {
    activePanel.value = 'add-new-photo-panel'
    photoPanelChangeViewLabel.value = 'Pokaż zdjęcia'
    panelRole.value = 'Dodaj nowe zdjęcie'
    return
  }
  if(activePanel.value === 'add-new-photo-panel') {
    activePanel.value = 'photos-preview-panel'
    photoPanelChangeViewLabel.value = 'Dodaj zdjecie'
    panelRole.value = 'Wybierz główne zdjecie'
    return
  }
}

const savePhoto = () => {

  let photoData = {
    binary: photoBinary,
    user_id: user._id
  }

}
const updatePhotoData = (photo) => {
  photoBinary = photo.binary
}

onMounted(async () => {
  user.value = JSON.parse(localStorage.getItem('user'))
  if(props.plant_id) {
    let userPlantPhotos = await getData(getUserPlantPhotos, [props.user_id, props.plant_id], plantPhotos)

    console.log("userPlantPhotos", userPlantPhotos)
    if(!userPlantPhotos) {
      activePanel.value = 'add-new-photo-panel'
      photoPanelChangeViewLabel.value = 'Pokaż zdjęcia'
      panelRole.value = 'Dodaj nowe zdjęcie'
    }

  }
  // selectedPhoto.value = plantPhotos.value.data.find((item) => {
  //   return item.isMainPhoto
  // }).uuid
})
</script>

<style>
#plant-photos-panel {
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.radio-input {
  display: block;
  position: absolute;
  top: 5px;
  left: 5px;
  background: #ffffff;
  padding: 3px;
  border-radius: 50%;
}

.plant-item-container {
  border: 1px solid black;
  border-radius: var(--bootstrap-radius);
  position: relative;
  flex: 1 0 250px;
  max-width: 250px;
}

.photo-item {
  width: 250px;
  height: 244px;
  max-height: 250px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
