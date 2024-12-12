<template>
  <div
    id="shared-plant"
    class="card border-success p-4 mx-auto big-card-size"
  >

    <div class="row m-0 p-0 mb-4">
      <div class="col-12 m-0 p-0">
        <h3 class="text-success text-center">Pochwal się swoją rośliną:</h3>
      </div>
    </div>


    <div class="row m-0 p-0 mt-1 mb-2">
      <div class="col-12 m-0 p-0">
        <BootstrapModal
          openingButtonLabel="Wybierz zdjęcie"
          openingButtonID="share-plant"
          isOpeningButtonDisabled=""
          :showHeader="true"
          :showFooter="false"
          :tooltipText="null"
        >
          <template #openingButton>
            Wybierz zdjęcie
          </template>
          <template #modalTitle>
            <span>Wybierz, którym zdjęciem rośliny chcesz się podzielić.</span>
          </template>
          <template #modalBody>
            <PhotosPanel :userUUID="user.uuid"/>
          </template>
        </BootstrapModal>
      </div>
    </div>


    <div class="row m-0 p-0">
      <div class="col-12 m-0 p-0">
        <textarea
          v-model="plantPost"
          rows="5"
          class="w-100 form-control mt-1 mb-2 text-justify"
          placeholder="Napisz coś ..."
        />
      </div>
    </div>

    <div class="row mb-0 p-0">
      <div class="col-12 m-0 p-0">
        <button
          class="btn btn-outline-success m-0 w-100"
          @click="addSharedPlant"
        >
          Podziel się
        </button>
      </div>
    </div>


    <div
      v-if="sharedPlants.data"
      v-for="sharedPlant in sharedPlants.data"
      :key="sharedPlant.uuid"
      class="row m-0 p-0 my-4"
    >
      <div class="col-6 m-0 p-0 shared-photos-left">
        <PhotoFileInput :photo="sharedPlant.photo" :isEditable="sharedPlant.userUUID === user.uuid"/>
      </div>
      <div class="col-6 m-0 p-0 d-flex flex-column justify-content-between">
        <div class="w-100 d-flex justify-content-around ">
          <span class="font-weight-bold">{{sharedPlant.userLogin}}</span>
          <span class="font-weight-bold">{{sharedPlant.date}}</span>
        </div>
        <div class="w-100">
          <textarea
            v-model="sharedPlant.text"
            class="w-100 form-control mt-1 mb-2 text-justify post-item"
            :disabled="sharedPlant.disabled"
            @input="setHeight"
          />
        </div>
        <div
          v-if="sharedPlant.userUUID === user.uuid"
          class="w-100"
        >
          <button
            class="btn btn-outline-success edit-post w-50"
            type="button"
            @click="editSharedPlant(sharedPlant.uuid)"
          >
            {{sharedPlant.buttonLabel}}
          </button>
          <button
            class="btn btn-outline-danger edit-post w-50"
            type="button"
            @click="deleteSharedPlant(sharedPlant.uuid)"
          >
            Usuń
          </button>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
import {nextTick, onMounted, ref} from "vue"
import {getSharedPlants} from "@/services/sharedPlant.js"
import {getData} from "@/services/servicesHelper.js"
import {formDateTimeToDisplay} from "@/views/utils/dateTimeHelper.js"
import BootstrapModal from "@/components/BootstrapModal.vue"
import PhotosPanel from "@/views/plantPhotos/PhotosPanel.vue"
import PhotoFileInput from "@/components/PhotoFileInput.vue"

const components = {
  BootstrapModal,
  PhotosPanel,
  PhotoFileInput
}

let user = ref("")
let plantPost = ref("")
let sharedPlants = ref({
  data: [],
  isLoading: false,
  error: null
})

const setHeight = (event) => {
  const textarea = event.target ? event.target : event;
  textarea.style.height = 'auto'
  textarea.style.height = `${textarea.scrollHeight}px`;
  textarea.style.height = `${textarea.scrollHeight}px`;
}

const addSharedPlant = () => {
  sharedPlants.value.data.unshift(
    {
      uuid: "temp uuuid",
      userUUID: user.uuid,
      userLogin: user.userLogin,
      plantUUID: "nuirw53ji",
      photo: "juka.jpg",
      text: plantPost.value,
      date: formDateTimeToDisplay(new Date()),
      disabled: true,
      buttonLabel: "Edytuj"
    }
  )
}

const editSharedPlant = (postUUID) => {
  const post = sharedPlants.value.data.find((post) => post.uuid === postUUID);
  if (post) {
    post.disabled = !post.disabled;
    if(post.disabled) {
      post.buttonLabel = "Edytuj"
      return
    }
    post.buttonLabel = "Zapisz"
  }
}

const deleteSharedPlant = (sharedPlantUUID) => {
  sharedPlants.value.data = sharedPlants.value.data.filter((item) => {
    return item.uuid !== sharedPlantUUID
  })
}

onMounted(async () => {
  user = await JSON.parse(localStorage.getItem("user"))
  await getData(getSharedPlants, [], sharedPlants)
  for(let sharedPlant of sharedPlants.value.data) {
    sharedPlant.disabled = true
    sharedPlant.buttonLabel = "Edytuj"
  }

  await nextTick();

  document.querySelectorAll('textarea').forEach(textarea => {
    setHeight(textarea)
  });

})
</script>

<style>
.shared-photos-left {
  display: flex;
  align-self: center;
}
</style>
