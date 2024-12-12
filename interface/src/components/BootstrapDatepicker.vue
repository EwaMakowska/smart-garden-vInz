<template>
  <div class="input-group">
    <input
        ref="inputDatepicker"
        type="text"
        class="form-control w-50"
        :placeholder="setPlaceholder"
        aria-describedby="icon-calendar"
    >
    <div class="input-group-append">
      <span class="input-group-text h-100" @click="openDatepicker">
            <font-awesome-icon icon="fas fa-calendar-alt" class="text-success"/>
      </span>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, unref} from 'vue'
import $ from 'jquery'
import 'bootstrap-datepicker'

const props = defineProps({
  setPlaceholder: String,
  setDate: {
    type: String,
    default: ""
  }
});

let emit = defineEmits(["update-items"])

const inputDatepicker = ref(null);

const openDatepicker = () => {
  if (!$(unref(inputDatepicker)).datepicker('getDate')) {
    $(unref(inputDatepicker)).datepicker('show');
  }
};

onMounted(() => {
  let isDateSet = false

  $(inputDatepicker.value).datepicker({
    autoclose: true,
    todayHighlight: true,
    format: "dd/mm/yyyy"
  })
      .on('changeDate', (e) => {
        if (!isDateSet) {
          isDateSet = true;
          // $(inputDatepicker.value).datepicker('setDate', e.format(0, "dd-mm-yyyy"));
          emit('update-items', $(inputDatepicker.value).datepicker('getFormattedDate'))
        } else {
          isDateSet = false;
        }
      });



  if (props.setDate) {
    let localDate = new Date(props.setDate);
    $(inputDatepicker.value).datepicker('update', localDate);
  }
});
</script>
