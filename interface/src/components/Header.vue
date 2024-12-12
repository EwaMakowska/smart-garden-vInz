<template>
<header>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
    <RouterLink class="navbar-brand" to="/">Smart Garden</RouterLink>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <RouterLink class="navbar-brand" to="/add-plant">dodaj roślinę</RouterLink>
<!--          <a class="nav-link" href="./add-plant.html">dodaj roślinę</a>-->
        </li>
        <li class="nav-item">
          <RouterLink class="navbar-brand" to="/settings">ustawienia</RouterLink>
<!--          <a class="nav-link" href="settings.html">ustawienia</a>-->
        </li>
      </ul>
    </div>
  </nav>
</header>
</template>

<script setup lang="js">
import { RouterView } from 'vue-router'

</script>
