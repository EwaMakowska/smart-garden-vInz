<template>
  <div id="add-edit-list-panel" class="w-100">
    <div class="w-100 m-0 p-0">
      <span class="badge black mb-1">
        {{label}}:
      </span>
    </div>


    <div class="w-100 m-0 p-0">
      <ul ref="list-container">
        <li
            v-for="(item, index) in items"
            :key="index"
            class="my-1"
        >
          <div class="w-100 m-0 p-0 d-flex justify-content-start">
            <input
                type="text"
                class="form-control"
                :value="items[index]"
                @input="updateItem($event, index)"
            />
            <button
                @click="removeItem(index)"
                class="btn btn-outline-danger m-0"
                type="button"
            >
              <font-awesome-icon icon="fa-solid fa-trash" />
            </button>
          </div>
        </li>
      </ul>
    </div>


    <div class="w-100 m-0 p-0 d-flex justify-content-start">
      <input
          type="text"
          class="form-control"
          v-model="newItem"

      />
      <button
          @click="addNewItem"
          type="button"
          class="btn btn-outline-success"
      >
        <font-awesome-icon
            icon="fa-solid fa-plus"
            v-tippy="tip"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import {ref, watchEffect} from "vue"
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"
let newItem = ref("")

let props = defineProps({
  label: String,
  tip: {String, default: ''},
  items: {type: Array, default: []}
})

let items = ref([...props.items]);
let emit = defineEmits(["update-items"]);

watchEffect(() => {
  items.value = [...props.items];
})

const updateServiceList = () => {
  emit('update-items', items.value);
}

const addNewItem = () => {
  items.value.push(newItem.value);
  updateServiceList();
  newItem.value = "";
}

const removeItem = (index) => {
  items.value = items.value.filter((_, i) => i !== index);
  updateServiceList();
}

const updateItem = (event, index) => {
  items.value[index] = event.target.value;
  updateServiceList();
}

</script>
