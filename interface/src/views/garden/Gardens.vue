<template>
    <div class="card border-success p-4 mx-auto gardens-card basic-card-size">
          <h4>
            Zdefiniowane ogródki:
          </h4>
          <div
            v-for="garden in gardens.data"
            :key="garden.uuid"
            class="d-flex justify-content-between w-100 actions-container mb-2"
            :class="setActivationState(garden.isActive)"
          >
            <router-link
              class="btn btn-outline-success go-to-garden m-0 d-flex justify-content-between align-items-center"
              :class="setActivationState(garden.isActive)"
              :to="`/garden/${garden.uuid}`"
            >
              <img
                :src="gardenIcon"
                alt=""
              >
              <span class="garden-name">
                {{garden.name}}
              </span>
              <font-awesome-icon
                icon="fa-solid fa-arrow-right"
                class="go-to-garden-icon"
              />
            </router-link>
            <router-link
              class="btn btn-outline-secondary go-to-edit-garden m-0 d-flex justify-content-center align-items-center"
              :to="`/edit-garden/${garden.uuid}`"
              :class="setActivationState(garden.isActive)"
            >
              <font-awesome-icon
                icon="a-solid fa-pen-to-square"
                :class="setActivationState(garden.isActive)"
              />
            </router-link>
            <div
              class="form-check form-switch is-active-bar basic-radius d-flex justify-content-center align-items-center"
              :class="setActiveBar(garden.isActive), setActivationState(garden.isActive)"
            >
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="isActiveSwitcher"
                :title="setTooltipText(garden.isActive)"
                v-model="garden.isActive"
              >
            </div>
          </div>
    <router-link
      class="btn btn-outline-secondary"
      :to="'/add-garden'"
    >
      DODAJ OGRÓDEK
    </router-link>
    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {getAllGardens} from "@/services/gardensService.js";
import gardenIcon from '@/assets/garden-icon.png';
import {getData} from "@/services/servicesHelper.js";

let gardens = ref({
  data: null,
  isLoading: false,
  error: null
})
const setActivationState = (isActive) => {
  if(!isActive) {
    return 'disabled'
  }
  return ''
}

const setTooltipText = (isActive) => {
  if(!isActive) {
    return "nieaktywny"
  }
  if(isActive) {
    return "aktywny"
  }
}

const setActiveBar = (isActive) => {
  if(!isActive) {
    return "disabled-border"
  }
  if (isActive) {
    return 'blue-border'
  }
}

onMounted(() => {
  getData(getAllGardens, [], gardens)
})

</script>

<style>
.go-to-garden img {
  height: 40px;
}

.go-to-garden {
  width: 45%;
}

.go-to-edit-garden,
.is-active-bar  {
  width: 20%;
}

.actions-container {
  width: 100%;
  height: 45px;
}

@media (max-width: 535px) {
  .go-to-garden,
  .go-to-edit-garden,
  .is-active-bar {
    width: 30% !important;
  }

  .garden-name,
  .go-to-garden-icon {
    display: none;
  }
}
</style>
