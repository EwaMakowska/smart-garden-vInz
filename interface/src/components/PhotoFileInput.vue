<template>
  <div id="file-input-container" class="mx-auto">

    <input
      id="photo-file-input"
      type="file"
      ref="photoFileInput"
      accept="image/png, image/jpeg, image/gif"
      @change="handleFileUpload($event)"
    />
    <button
      @click="triggerFileInput($event)"
      type="button"
      class="btn btn-outline-dark w-100"
      :class="setClass(isEditable, 'button')"
      id="get-photo-button"
    >
      {{buttonLabel}}
    </button>
    <div
      ref="photo-file-input-preview"
      id='image-preview'
      :style="previewStyle"
      :class="setClass(isEditable, 'container')"
    ></div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed, unref} from 'vue'

const props = defineProps({
  isEditable: { type: Boolean, default: true },
  user_id: {type:String, required: true },
  plant_id: {type: String, required: true }
})

const buttonLabel = ref('Wybierz zdjęcie')
const photoFileInput = ref(null)
const uploadedImage = ref(null)
const setClass = (isEditable, element) => {
  if(!isEditable) {
    if(element === "button") {
      return 'no-editable'
    }
    if(element === "container") {
      return 'no-editable-layout'
    }
  }
  return ''
}

const triggerFileInput = (event) => {
  unref(photoFileInput).click()
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return;
  const reader = new FileReader()

  reader.onload = (e) => {
    const arrayBuffer = e.target.result;
    uploadedImage.value = e.target.result
    buttonLabel.value = 'Zmień zdjęcie'

    const base64 = btoa(
        new Uint8Array(arrayBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
        ),
    );
    const photoData = {
      name: file.name,
      type: file.type,
      binary: base64,
    };


    // reader.readAsDataURL(file)
    // let formData = new FormData();
    // formData.append('photo', file);
    // photoData.binary = formData
    //
    // console.log("aaaaaaaaaaaa", photoData)
  }
  reader.readAsArrayBuffer(file);
}

const previewStyle = computed(() => {
  return uploadedImage.value
    ? {backgroundImage: `url('${uploadedImage.value}')`, display: 'block'}
    : {display: 'none' }
})

onMounted(async () => {
  if(props.photo) {
    uploadedImage.value = `/src/assets/plants-photos/${user.uuid}/${props.photo}`
  }

  if(uploadedImage.value) {
    buttonLabel.value = 'Zmień zdjęcie'
  }
})
</script>

<style>
@import "../assets/css/plant-photo.css";
</style>
