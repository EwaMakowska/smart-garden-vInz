<template>
  <div class="container-fluid">
    <div id="basic-notification-window" class="">
      <div id="basic-notification-header" class="w-100 m-0 p-1 d-flex justify-content-end hidden-header">
        <button id="close-notification" class="btn btn-outline-secondary m-0">
          <font-awesome-icon icon="fa-solid fa-x" />
        </button>
      </div>
      <div id="basic-notification-content" class="w-100 m-0 p-0"></div>
    </div>
    <Header />
    <RouterView />
  </div>

</template>


<script setup>
import { RouterView } from 'vue-router'
import Header from "@/components/Header.vue"
const components = {
  Header
}
</script>

<style scoped>
@import "@/assets/css/basic-notification-window.css";
</style>
