//komponent eksperymentalny, jeszcze nie wykończony

<template>
  <div id="disabled-enabled-textarea" class="w-100">
    <div class="w-100">
        <textarea
          v-model="postText"
          rows="5"
          class="w-100 form-control mt-1 mb-2 text-justify post-item"
          :disabled="isDisabled"
        />
      <button
        class="btn btn-outline-success edit-post w-100"
        type="button"
        @click="editPost(postUUID)"
      >
        {{buttonLabel}}
      </button>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue';

let props = defineProps({
  postText: String,
  buttonLabel: String,
  postUUID: String
})


let disabled = ref(true)
let editPost = (postUUID) => {
  const post = posts.value.data.posts.find((post) => post.uuid === postUUID);
  if (post) {
    post.disabled = !post.disabled;
    if(post.disabled) {
      post.buttonLabel = "Edytuj"
      return
    }
    post.buttonLabel = "Zapisz"
  }
}
</script>
