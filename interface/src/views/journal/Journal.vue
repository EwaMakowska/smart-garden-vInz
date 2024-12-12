<template>
  <form id="journal" class="card border-success p-4 mx-auto basic-card-size">
    <div class="row m-0 p-0 mb-4">
      <h4 class="text-success text-center">Dziennik</h4>
    </div>


    <div class="row m-0 p-0 mt-2 mb-4">
      <div class="col-12 m-0 p-0">
        <input
          id="current-date-input"
          class="form-control mb-2"
          type="datetime-local"
          placeholder="nowy wpis ..."
          v-model="currentPostDatetime"
        >
        <textarea
          v-model="newPost"
          rows="5"
          class="w-100 form-control mb-1"
        />
      </div>
      <div class="row m-0 p-0 mb-4">
        <button
          class="btn btn-outline-success w-100"
          type="button"
          @click="saveNewPost"
        >
          ZAPISZ
        </button>
      </div>
    </div>


    <div class="row m-0 p-0 mb-4" v-if="posts.data">
      <div
        v-for="post in posts.data.posts"
        :key="post.uuid"
        class="col-12 m-0 p-0 mb-4"
      >
        <div class="w-100">
          <p class="m-0 p-0 mb-1 font-weight-bold">{{post.date}}</p>
        </div>
        <textarea
          v-model="post.text"
          rows="5"
          class="w-100 form-control mt-1 mb-2 text-justify post-item"
          :disabled="post.disabled"
        />
        <button
          class="btn btn-outline-success edit-post w-100"
          type="button"
          @click="editPost(post.uuid)"
        >
          {{post.buttonLabel}}
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import {onMounted, ref} from "vue"
import {getJournal} from "@/services/journalServices.js"
import {getData} from "@/services/servicesHelper.js"
import {formDateTimeToInput} from "@/views/utils/dateTimeHelper.js"

const props = defineProps({
  journalUUID: String
})

let newPost = ref("")
let posts = ref({
  data: {
    uuid: null,
    posts: []
  },
  isLoading: false,
  error: true
})
let currentPostDatetime = ref(formDateTimeToInput(new Date()))

let saveNewPost = () => {
  posts.value.data.posts.unshift({
    uuid: "create uuid",
    date: currentPostDatetime.value,
    text: newPost.value,
    editable: false,
    buttonLabel: "Edytuj"
  })
}

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

onMounted(async () => {
  await getData(getJournal, [props.journalUUID], posts)
  //uzupełnij dane
  for(let post of posts.value.data.posts) {
    post.disabled = true
    post.buttonLabel = "Edytuj"
  }
})
</script>

<style>
#current-date-input {
  width: 170px;
}

.post-item:disabled {
  background-color: var(--bs-gray-100);
  border: none
}
</style>
