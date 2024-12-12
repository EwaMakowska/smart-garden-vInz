<template>
  <div id="password-field" class="w-100 d-flex justify-content-start">
    <input
      id="password-field"
      :type="passwordFieldState.type"
      class="form-control"
      ref="password"
    >
    <button
      id="change-password-field-state-button"
      class="btn btn-outline-secondary px-1"
      ref="showHidePassword"
      type="button"
      @click="togglePasswordVisibility"
      v-tippy="passwordFieldState.label"
    >
      <font-awesome-icon
        :icon="passwordFieldState.icon"
      />
    </button>
  </div>
</template>

<script setup>
import {ref} from "vue"
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"

let passwordShow = {
  state: "hide",
  icon: "fa-solid fa-eye",
  label: "Pokaż hasło",
  type: "password"
}

let passwordHide = {
  state: "visible",
  icon: "fa-solid fa-eye-slash",
  label: "Ukryj hasło",
  type: "text"
}

let passwordFieldState = ref(passwordShow)

let togglePasswordVisibility = () => {
  if(passwordFieldState.value.state === 'hide') {
    passwordFieldState.value = passwordHide
    return
  }
  if(passwordFieldState.value.state === 'visible') {
    passwordFieldState.value = passwordShow
    return
  }
}

</script>

<style>
#password-field {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

#change-password-field-state-button {
  border: var(--bs-border-width) solid var(--bs-border-color);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: none;
}
</style>
