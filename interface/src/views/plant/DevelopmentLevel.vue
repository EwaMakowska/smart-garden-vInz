<template>
  <div id="development-level">
    <div class="badge black p-0 m-0 mb-2 text-start">
      Spróbuj określić wiek swojej roślinki:
    </div>
    <div id="development-level-container">
      <div class="development-level-item" v-for="(level, index) in levels" :key="level.id" :class="{'last-item': index === levels.length - 1}">
        <button
          type="button"
          class="btn btn-circle"
          @click="specifyDevelopmentLevel($event)"
          v-tippy="level.label"
          :data-level-id="level.id"
          :class="buttonClass(level.id)"
        >
          <img :src="'/src/assets/icons/plants/' + level.icon" :data-level-id="level.id" />
        </button>
        <div class="development-level-item-line"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, watchEffect} from "vue"
import plantDevelopmentLevels from "@/enums/plantDevelopmentLevels.js"
import {getAllDevelopmentLevelOptions} from "@/services/optionsServices.js"
import {getData} from "@/services/servicesHelper.js"

const props = defineProps({
  developmentLevel: Number | null
});

const emit = defineEmits(["update-development-level"])

const levels = ref(plantDevelopmentLevels)

let currentLevel = ref(null)
const specifyDevelopmentLevel = function (event) {
  const button = event.target;
  currentLevel.value = parseInt(button.dataset.levelId);
  emit('update-development-level', currentLevel.value)
}

const buttonClass = function (level) {
  if (currentLevel.value !== null && level <= currentLevel.value) {
    return "btn-success";
  } else {
    return "btn-secondary";
  }
};

watchEffect(() => {
  if (props.developmentLevel && !currentLevel.value) {
    currentLevel.value = props.developmentLevel;
  }
});

// let developmentLevelOptions = ref({
//   data: [],
//   isLoading: false,
//   error: ""
// })

// onMounted(async () => {
//   getData(getAllDevelopmentLevelOptions, [], developmentLevelOptions)
// })

</script>

<style>
@import url('/src/assets/css/development-level.css');
</style>
