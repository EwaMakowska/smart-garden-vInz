<template>
  <button
    @click="openModal"
    class="btn btn-outline-dark"
    :class="isOpeningButtonDisabled"
    :id="openingButtonID"
    type="button"
    v-tippy="tooltipText"
  >
    <slot name="openingButton"></slot>
  </button>

  <div class="modal" :class="{ 'd-block': showModal, fade: !showModal }">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div
          v-if="showHeader"
          class="modal-header">
          <h3 class="modal-title d-flex align-items-center justify-content-start header-title">
            <slot name="modalTitle"></slot>
          </h3>
          <div class="d-flex justify-content-end align-items-center header-actions">
            <slot name="headerExtraButton"></slot>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
        </div>

        <div class="modal-body">
          <slot name="modalBody"></slot>
        </div>

        <div
          v-if="showFooter"
          class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
        </div>

      </div>
    </div>
  </div>
  <!-- Modal ends here -->
</template>

<script setup>
import {ref, watch} from 'vue'

const props = defineProps({
  openingButtonLabel: String,
  openingButtonID: String,
  isOpeningButtonDisabled: String | "",
  showHeader: Boolean,
  showFooter: Boolean,
  tooltipText: String | null,
  forceClose: {
    type: Boolean,
    default: false,
  }
});

let showModal = ref(false)

let openModal = () => {
  showModal.value = true
}

let closeModal = () => {
  showModal.value = false
}

watch(() => props.forceClose, async (shouldCloseModal) => {
  if(shouldCloseModal) {
    closeModal()
  }

}, {immediate: true})
</script>

<style>
.modal.d-block {
  display: block;
}
.modal.fade .modal-dialog {
  transition: transform 0.3s ease-out;
  transform: translate(0, -50%);
}
.modal.d-block.fade .modal-dialog {
  transform: translate(0);
}

.header-title {
  width: 70%;
  margin: 0;
}

.header-actions {
  width: 30%;
  margin: 0;
}
</style>
