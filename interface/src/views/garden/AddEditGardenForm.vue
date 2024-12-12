<template>
  <form id="add-edit-garden-form" class="card border-success p-4 mx-auto basic-card-size">
    <div class="row mb-4">
      <div class="col-12 text-center">
        <h3 class="text-uppercase">{{formName}}</h3>
      </div>
    </div>
        <div class="row mb-4">
          <div class="col-12">
               <div class="form-outline">
                  <input
                    type="text"
                    class="form-control w-100"
                    placeholder="nazwij swój ogródek"
                    v-model="garden.name"
                  />
               </div>
          </div>
        </div>
    <div class="row mb-4">
      <div class="row mb-1">
        <div class="col-12">
          Zaplanuj zimowanie roślin:
        </div>
      </div>
      <div class="row">
        <div class="col-5">
          <BootstrapDatepicker set-placeholder="od" :setDate="garden.wintering.dateFrom"/>
        </div>
        <div class="col-2 d-flex align-items-center justify-content-center" id="#smallElement">
          &minus;
        </div>
        <div class="col-5">
          <BootstrapDatepicker set-placeholder="do" :setDate="garden.wintering.dateTo" />
        </div>
      </div>
    </div>
        <div class="row mb-4">
          <div class="col-12">
            <div class="form-outline">
              <textarea
                class="form-control" placeholder="jeżeli chcesz, opisz wymagania rośliny, aby szybko móc do nich wrócić"
                rows="5"
                v-model="garden.description"
              ></textarea>
            </div>
          </div>
        </div>
    <div class="row mb-2">
      <div class="col-12">
        <button
          class="btn btn-outline-danger m-0 w-100 text-uppercase"
          id="save-garden-edit"
          >
          zapisz
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="js">
import BootstrapDatepicker from "@/components/BootstrapDatepicker.vue"

const props = defineProps({
  formName: String,
  garden: { type: Object, default: () => ({
      watering: {
        liters: null,
        period: null
      },
      wintering: {
        dateFrom: null,
        dateTo: null
      }
    }) }
});

</script>

<style>

</style>
